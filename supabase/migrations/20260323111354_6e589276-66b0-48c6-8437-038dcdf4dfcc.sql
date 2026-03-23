
-- Profiles table for additional user data
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  company text,
  role_type text NOT NULL DEFAULT 'viewer' CHECK (role_type IN ('buyer', 'supplier', 'auditor', 'admin')),
  phone text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Suppliers table
CREATE TABLE public.suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text,
  country text DEFAULT 'Croatia',
  industry text,
  sub_industry text,
  employee_count integer,
  revenue_eur numeric,
  certifications text[] DEFAULT '{}',
  website text,
  contact_email text,
  oib text, -- Croatian tax ID
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view suppliers" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert suppliers" ON public.suppliers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update suppliers" ON public.suppliers FOR UPDATE USING (auth.role() = 'authenticated');

-- Audits table
CREATE TABLE public.audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE CASCADE NOT NULL,
  auditor_id uuid REFERENCES auth.users(id),
  requested_by uuid REFERENCES auth.users(id),
  audit_type text NOT NULL DEFAULT 'initial' CHECK (audit_type IN ('initial', 'surveillance', 'recertification', 'special')),
  standard text, -- e.g. IATF 16949, ISO 9001
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  scheduled_date date,
  completed_date date,
  overall_score numeric,
  summary text,
  ai_analysis text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view audits" ON public.audits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert audits" ON public.audits FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update audits" ON public.audits FOR UPDATE USING (auth.role() = 'authenticated');

-- Audit checkpoints (checklist items)
CREATE TABLE public.audit_checkpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  question text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pass', 'fail', 'na', 'observation')),
  notes text,
  score numeric,
  order_index integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_checkpoints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view checkpoints" ON public.audit_checkpoints FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert checkpoints" ON public.audit_checkpoints FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update checkpoints" ON public.audit_checkpoints FOR UPDATE USING (auth.role() = 'authenticated');

-- Audit findings
CREATE TABLE public.audit_findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  checkpoint_id uuid REFERENCES public.audit_checkpoints(id),
  severity text NOT NULL DEFAULT 'observation' CHECK (severity IN ('critical', 'major', 'minor', 'observation')),
  title text NOT NULL,
  description text,
  evidence_notes text,
  ai_recommendation text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view findings" ON public.audit_findings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert findings" ON public.audit_findings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update findings" ON public.audit_findings FOR UPDATE USING (auth.role() = 'authenticated');

-- Audit evidence (photos, documents)
CREATE TABLE public.audit_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  finding_id uuid REFERENCES public.audit_findings(id),
  checkpoint_id uuid REFERENCES public.audit_checkpoints(id),
  file_path text NOT NULL,
  file_name text NOT NULL,
  mime_type text,
  description text,
  ai_analysis text,
  geo_lat numeric,
  geo_lng numeric,
  captured_at timestamptz,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_evidence ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view evidence" ON public.audit_evidence FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert evidence" ON public.audit_evidence FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CAPA actions
CREATE TABLE public.capa_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  finding_id uuid REFERENCES public.audit_findings(id) ON DELETE CASCADE NOT NULL,
  audit_id uuid REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  responsible_user_id uuid REFERENCES auth.users(id),
  due_date date,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'verified', 'overdue')),
  completion_notes text,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.capa_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view capa" ON public.capa_actions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert capa" ON public.capa_actions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update capa" ON public.capa_actions FOR UPDATE USING (auth.role() = 'authenticated');

-- Storage bucket for audit evidence
INSERT INTO storage.buckets (id, name, public) VALUES ('audit-evidence', 'audit-evidence', false);

CREATE POLICY "Authenticated users can upload evidence" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'audit-evidence' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view evidence" ON storage.objects
  FOR SELECT USING (bucket_id = 'audit-evidence' AND auth.role() = 'authenticated');
