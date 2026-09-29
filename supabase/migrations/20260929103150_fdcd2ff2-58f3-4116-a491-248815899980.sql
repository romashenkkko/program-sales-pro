CREATE TABLE public.early_access_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audience text NOT NULL CHECK (audience IN ('trainer', 'client')),
  email text NOT NULL,
  phone text,
  social_link text,
  instagram_link text,
  consent_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT early_access_signups_email_audience_key UNIQUE (email, audience)
);
GRANT ALL ON public.early_access_signups TO service_role;
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.set_early_access_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER early_access_signups_updated_at BEFORE UPDATE ON public.early_access_signups FOR EACH ROW EXECUTE FUNCTION public.set_early_access_updated_at();