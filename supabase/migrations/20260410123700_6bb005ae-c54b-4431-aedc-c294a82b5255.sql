
-- 1. Main audit report table
CREATE TABLE public.audit_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  client_name TEXT NOT NULL DEFAULT '',
  client_logo_url TEXT,
  standard TEXT NOT NULL DEFAULT 'ISO 9001:2015',
  verdict TEXT NOT NULL DEFAULT 'conditional' CHECK (verdict IN ('go', 'conditional', 'no-go')),
  iatf_score NUMERIC,
  executive_summary JSONB NOT NULL DEFAULT '[]'::jsonb,
  cost_exposure_eur NUMERIC DEFAULT 0,
  mitigation_savings_eur NUMERIC DEFAULT 0,
  supplier_name TEXT NOT NULL DEFAULT '',
  supplier_location TEXT,
  audit_date DATE,
  auditor_name TEXT,
  report_version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published')),
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view reports" ON public.audit_reports FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can insert reports" ON public.audit_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can update reports" ON public.audit_reports FOR UPDATE USING (auth.role() = 'authenticated'::text);

-- 2. Flexible report stations / sections
CREATE TABLE public.report_stations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.audit_reports(id) ON DELETE CASCADE NOT NULL,
  station_index INTEGER NOT NULL DEFAULT 0,
  name TEXT NOT NULL,
  health TEXT NOT NULL DEFAULT 'grey' CHECK (health IN ('green', 'amber', 'red', 'grey')),
  observation TEXT,
  interpretation TEXT,
  confidence INTEGER DEFAULT 0,
  hero_photo_url TEXT,
  findings JSONB NOT NULL DEFAULT '[]'::jsonb,
  sub_categories JSONB NOT NULL DEFAULT '[]'::jsonb,
  atlas_insights JSONB NOT NULL DEFAULT '[]'::jsonb,
  audit_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  evidence_photos INTEGER DEFAULT 0,
  evidence_measurements INTEGER DEFAULT 0,
  evidence_videos INTEGER DEFAULT 0,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.report_stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view stations" ON public.report_stations FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can insert stations" ON public.report_stations FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can update stations" ON public.report_stations FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can delete stations" ON public.report_stations FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE INDEX idx_report_stations_report ON public.report_stations(report_id, station_index);

-- 3. Machine park profiles
CREATE TABLE public.report_machines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.audit_reports(id) ON DELETE CASCADE NOT NULL,
  machine_code TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  model TEXT NOT NULL,
  serial_number TEXT,
  year_manufactured INTEGER,
  origin_country TEXT,
  origin_tier TEXT DEFAULT 'oem-standard' CHECK (origin_tier IN ('oem-premium', 'oem-standard', 'economy')),
  category TEXT,
  location TEXT,
  condition TEXT DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  condition_score INTEGER DEFAULT 0,
  oee NUMERIC DEFAULT 0,
  availability NUMERIC DEFAULT 0,
  performance NUMERIC DEFAULT 0,
  quality NUMERIC DEFAULT 0,
  energy_kwh NUMERIC DEFAULT 0,
  energy_class TEXT,
  co2_per_year NUMERIC DEFAULT 0,
  client_suitability TEXT DEFAULT 'conditional' CHECK (client_suitability IN ('approved', 'conditional', 'not-suitable')),
  suitability_reason TEXT,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  capabilities TEXT[] DEFAULT '{}'::text[],
  risks TEXT[] DEFAULT '{}'::text[],
  atlas_insight TEXT,
  last_maintenance DATE,
  next_maintenance DATE,
  type_plate_image_url TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.report_machines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view machines" ON public.report_machines FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can insert machines" ON public.report_machines FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can update machines" ON public.report_machines FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can delete machines" ON public.report_machines FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE INDEX idx_report_machines_report ON public.report_machines(report_id);

-- 4. Radar chart dimension scores (flexible per client/standard)
CREATE TABLE public.report_radar_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.audit_reports(id) ON DELETE CASCADE NOT NULL,
  chart_type TEXT NOT NULL CHECK (chart_type IN ('production', 'commercial')),
  dimension_key TEXT NOT NULL,
  dimension_label TEXT NOT NULL,
  actual_score NUMERIC NOT NULL DEFAULT 0,
  benchmark_score NUMERIC DEFAULT 0,
  max_score NUMERIC NOT NULL DEFAULT 100,
  sort_order INTEGER DEFAULT 0,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.report_radar_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view radar scores" ON public.report_radar_scores FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can insert radar scores" ON public.report_radar_scores FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can update radar scores" ON public.report_radar_scores FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can delete radar scores" ON public.report_radar_scores FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE INDEX idx_radar_scores_report ON public.report_radar_scores(report_id, chart_type);

-- 5. Report NCRs
CREATE TABLE public.report_ncrs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.audit_reports(id) ON DELETE CASCADE NOT NULL,
  station_id UUID REFERENCES public.report_stations(id) ON DELETE SET NULL,
  ncr_code TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'minor' CHECK (severity IN ('minor', 'major', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  iso_clause TEXT,
  evidence_refs JSONB DEFAULT '[]'::jsonb,
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'closed', 'verified')),
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.report_ncrs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view ncrs" ON public.report_ncrs FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can insert ncrs" ON public.report_ncrs FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated can update ncrs" ON public.report_ncrs FOR UPDATE USING (auth.role() = 'authenticated'::text);

CREATE INDEX idx_report_ncrs_report ON public.report_ncrs(report_id);

-- Timestamp triggers
CREATE TRIGGER update_audit_reports_updated_at BEFORE UPDATE ON public.audit_reports FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_report_stations_updated_at BEFORE UPDATE ON public.report_stations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_report_machines_updated_at BEFORE UPDATE ON public.report_machines FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_report_ncrs_updated_at BEFORE UPDATE ON public.report_ncrs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
