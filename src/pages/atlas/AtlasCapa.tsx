import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AtlasCapa = () => {
  const [actions, setActions] = useState<any[]>([]);

  const fetchActions = async () => {
    const { data } = await supabase
      .from("capa_actions")
      .select("*, audit_findings(title, severity), audits(*, suppliers(name))")
      .order("created_at", { ascending: false });
    setActions(data || []);
  };

  useEffect(() => { fetchActions(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("capa_actions").update({
      status: status as any,
      ...(status === "completed" ? { completed_at: new Date().toISOString() } : {}),
    }).eq("id", id);
    toast({ title: "Status updated" });
    fetchActions();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CAPA Actions</h1>
        <p className="text-muted-foreground">Corrective and Preventive Actions tracking</p>
      </div>

      <div className="space-y-3">
        {actions.map((a) => (
          <Card key={a.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {(a.audits as any)?.suppliers?.name} • Finding: {(a.audit_findings as any)?.title}
                  {a.due_date && ` • Due: ${a.due_date}`}
                </p>
              </div>
              <Select value={a.status} onValueChange={(v) => updateStatus(a.id, v)}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
        {actions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No CAPA actions yet.</div>
        )}
      </div>
    </div>
  );
};

export default AtlasCapa;
