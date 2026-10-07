import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

type WaitlistSignup = {
  audience: 'trainer' | 'client';
  email: string;
  phone: string | null;
  socialLink: string | null;
  instagramLink: string | null;
  consentAt: string;
};

let database: DatabaseSync | undefined;

function getDatabase() {
  if (database) return database;

  const databasePath = resolve(process.env['FORMA_SQLITE_PATH'] || 'data/forma.sqlite');
  mkdirSync(dirname(databasePath), { recursive: true });
  database = new DatabaseSync(databasePath);
  database.exec(`
    CREATE TABLE IF NOT EXISTS early_access_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      audience TEXT NOT NULL CHECK (audience IN ('trainer', 'client')),
      email TEXT NOT NULL,
      phone TEXT,
      social_link TEXT,
      instagram_link TEXT,
      consent_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (email, audience)
    );
  `);

  return database;
}

export function insertWaitlistSignup(signup: WaitlistSignup): 'success' | 'exists' {
  const result = getDatabase().prepare(`
    INSERT OR IGNORE INTO early_access_signups
      (audience, email, phone, social_link, instagram_link, consent_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    signup.audience,
    signup.email,
    signup.phone,
    signup.socialLink,
    signup.instagramLink,
    signup.consentAt,
  );

  return Number(result.changes) === 0 ? 'exists' : 'success';
}
