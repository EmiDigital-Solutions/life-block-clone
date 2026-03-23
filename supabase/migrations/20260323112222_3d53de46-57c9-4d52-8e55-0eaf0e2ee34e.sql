
ALTER TABLE public.profiles DROP CONSTRAINT profiles_role_type_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_type_check CHECK (role_type IN ('buyer', 'supplier', 'auditor', 'admin', 'viewer'));
