import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const databasePath = resolve(process.env.FORMA_SQLITE_PATH || 'data/forma.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });

const database = new DatabaseSync(databasePath);
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
database.close();

console.log(`SQLite database ready: ${databasePath}`);
