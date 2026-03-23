import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ClipboardCheck, AlertTriangle, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AtlasDashboard = () => {
  const [stats, setStats] = useState({ suppliers: 0, audits: 0, findings: 0, capa: 0 });
  const [recentAudits, setRecentAudits] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [suppliers, audits, findings, capa] = await Promise.all([
        supabase.from("suppliers").select("id", { count: "exact", head: true }),
        supabase.from("audits").select("id", { count: "exact", head: true }),
        supabase.from("audit_findings").select("id", { count: "exact", head: true }),
        supabase.from("capa_actions").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        suppliers: suppliers.count || 0,
        audits: audits.count || 0,
        findings: findings.count || 0,
        capa: capa.count || 0,
      });
    };

    const fetchRecent = async () => {
      const { data } = await supabase
        .from("audits")
        .select("*, suppliers(name, city)")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentAudits(data || []);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const cards = [
    { label: "Suppliers", value: stats.suppliers, icon: Building2, color: "text-primary" },
    { label: "Audits", value: stats.audits, icon: ClipboardCheck, color: "text-blue-600" },
    { label: "Open Findings", value: stats.findings, icon: AlertTriangle, color: "text-amber-600" },
    { label: "CAPA Actions", value: stats.capa, icon: ShieldCheck, color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Atlas AI — Supplier Intelligence Platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Audits</CardTitle>
        </CardHeader>
        <CardContent>
          {recentAudits.length === 0 ? (
            <p className="text-muted-foreground text-sm">No audits yet. Create your first audit to get started.</p>
          ) : (
            <div className="space-y-3">
              {recentAudits.map((audit) => (
                <div key={audit.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{(audit.suppliers as any)?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {audit.audit_type} • {audit.standard || "N/A"} • {(audit.suppliers as any)?.city}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    audit.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                    audit.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                    audit.status === "cancelled" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {audit.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AtlasDashboard;
