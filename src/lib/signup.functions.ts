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
    const { insertWaitlistSignup } = await import('@/integrations/sqlite/client.server');
    return {
      status: insertWaitlistSignup({
        audience: data.audience,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        socialLink: data.socialLink || null,
        instagramLink: data.audience === 'trainer' ? data.instagramLink || null : null,
        consentAt: new Date().toISOString(),
      }),
    };
  });
