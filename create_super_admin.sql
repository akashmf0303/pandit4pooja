-- ==========================================
-- SUPER ADMIN CREATION SCRIPT (UPDATE)
-- ==========================================

-- 1. Confirm the existing user's email and ensure password is correct
UPDATE auth.users
SET email_confirmed_at = now(),
    encrypted_password = crypt('Ankush@7890', gen_salt('bf'))
WHERE email = 'admin@panditt4pooja.in';

-- 2. Create or update their linked admin profile automatically
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  role
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@panditt4pooja.in'),
  'Super Admin',
  'admin@panditt4pooja.in',
  'admin'
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin',
    full_name = 'Super Admin';
