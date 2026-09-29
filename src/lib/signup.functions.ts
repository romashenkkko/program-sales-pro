import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const signupSchema = z.object({
  audience: z.enum(['trainer', 'client']),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional(),
  socialLink: z.string().trim().max(300).optional(),
  instagramLink: z.string().trim().max(300).optional(),
  consent: z.literal(true),
  website: z.string().max(0),
});

export const joinWaitlist = createServerFn({ method: 'POST' })
  .validator((data) => signupSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('early_access_signups').insert({
      audience: data.audience,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      social_link: data.socialLink || null,
      instagram_link: data.audience === 'trainer' ? data.instagramLink || null : null,
      consent_at: new Date().toISOString(),
    });
    if (error?.code === '23505') return { status: 'exists' as const };
    if (error) throw new Error('Не удалось сохранить заявку. Попробуйте позже.');
    return { status: 'success' as const };
  });
