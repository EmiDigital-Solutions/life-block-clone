import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const AtlasFindings = () => {
  const [findings, setFindings] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("audit_findings")
        .select("*, audits(*, suppliers(name))")
        .order("created_at", { ascending: false });
      setFindings(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Findings</h1>
        <p className="text-muted-foreground">All audit findings across suppliers</p>
      </div>

      <div className="space-y-3">
        {findings.map((f) => (
          <Card key={f.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                f.severity === "critical" ? "text-red-600" :
                f.severity === "major" ? "text-orange-600" :
                f.severity === "minor" ? "text-yellow-600" :
                "text-blue-600"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{f.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {(f.audits as any)?.suppliers?.name} • {f.severity} • {f.status}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                f.status === "resolved" ? "bg-emerald-100 text-emerald-700" :
                f.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                "bg-gray-100 text-gray-700"
              }`}>{f.status}</span>
            </CardContent>
          </Card>
        ))}
        {findings.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No findings yet.</div>
        )}
      </div>
    </div>
  );
};

export default AtlasFindings;
