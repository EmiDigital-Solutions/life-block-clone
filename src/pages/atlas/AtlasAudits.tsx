import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ClipboardCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AtlasAudits = () => {
  const [audits, setAudits] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ supplier_id: "", audit_type: "initial", standard: "", scheduled_date: "" });
  const navigate = useNavigate();

  const fetchAudits = async () => {
    const { data } = await supabase
      .from("audits")
      .select("*, suppliers(name, city)")
      .order("created_at", { ascending: false });
    setAudits(data || []);
  };

  const fetchSuppliers = async () => {
    const { data } = await supabase.from("suppliers").select("id, name").order("name");
    setSuppliers(data || []);
  };

  useEffect(() => { fetchAudits(); fetchSuppliers(); }, []);

  const handleCreate = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from("audits").insert({
      supplier_id: form.supplier_id,
      audit_type: form.audit_type as any,
      standard: form.standard || null,
      scheduled_date: form.scheduled_date || null,
      requested_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Audit created" });
      setShowCreate(false);
      setForm({ supplier_id: "", audit_type: "initial", standard: "", scheduled_date: "" });
      fetchAudits();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audits</h1>
          <p className="text-muted-foreground">Manage supplier audits and inspections</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" /> New Audit
        </Button>
      </div>

      <div className="space-y-3">
        {audits.map((audit) => (
          <Card
            key={audit.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/atlas/audits/${audit.id}`)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{(audit.suppliers as any)?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {audit.audit_type} • {audit.standard || "N/A"} • {audit.scheduled_date || "Unscheduled"}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                audit.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                audit.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                audit.status === "cancelled" ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {audit.status}
              </span>
            </CardContent>
          </Card>
        ))}
        {audits.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No audits yet. Create your first audit to get started.
          </div>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create New Audit</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Supplier *</Label>
              <Select value={form.supplier_id} onValueChange={(v) => setForm({...form, supplier_id: v})}>
                <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Audit Type</Label>
              <Select value={form.audit_type} onValueChange={(v) => setForm({...form, audit_type: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial</SelectItem>
                  <SelectItem value="surveillance">Surveillance</SelectItem>
                  <SelectItem value="recertification">Recertification</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Standard</Label><Input value={form.standard} onChange={(e) => setForm({...form, standard: e.target.value})} placeholder="e.g. IATF 16949, ISO 9001" /></div>
            <div><Label>Scheduled Date</Label><Input type="date" value={form.scheduled_date} onChange={(e) => setForm({...form, scheduled_date: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!form.supplier_id}>Create Audit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AtlasAudits;
