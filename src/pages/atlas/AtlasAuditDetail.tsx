import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, XCircle, AlertTriangle, MinusCircle, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const statusIcon = (status: string) => {
  switch (status) {
    case "pass": return <CheckCircle className="h-5 w-5 text-emerald-600" />;
    case "fail": return <XCircle className="h-5 w-5 text-red-600" />;
    case "observation": return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    case "na": return <MinusCircle className="h-5 w-5 text-gray-400" />;
    default: return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
  }
};

const AtlasAuditDetail = () => {
  const { auditId } = useParams();
  const [audit, setAudit] = useState<any>(null);
  const [checkpoints, setCheckpoints] = useState<any[]>([]);
  const [findings, setFindings] = useState<any[]>([]);
  const [showAddCheckpoint, setShowAddCheckpoint] = useState(false);
  const [showAddFinding, setShowAddFinding] = useState(false);
  const [cpForm, setCpForm] = useState({ category: "", question: "" });
  const [findingForm, setFindingForm] = useState({ title: "", description: "", severity: "observation", checkpoint_id: "" });

  const fetchAll = async () => {
    if (!auditId) return;
    const [auditRes, cpRes, findRes] = await Promise.all([
      supabase.from("audits").select("*, suppliers(name, city)").eq("id", auditId).single(),
      supabase.from("audit_checkpoints").select("*").eq("audit_id", auditId).order("order_index"),
      supabase.from("audit_findings").select("*").eq("audit_id", auditId).order("created_at"),
    ]);
    setAudit(auditRes.data);
    setCheckpoints(cpRes.data || []);
    setFindings(findRes.data || []);
  };

  useEffect(() => { fetchAll(); }, [auditId]);

  const updateCheckpointStatus = async (id: string, status: string) => {
    await supabase.from("audit_checkpoints").update({ status: status as any }).eq("id", id);
    fetchAll();
  };

  const addCheckpoint = async () => {
    await supabase.from("audit_checkpoints").insert({
      audit_id: auditId!,
      category: cpForm.category,
      question: cpForm.question,
      order_index: checkpoints.length,
    });
    setShowAddCheckpoint(false);
    setCpForm({ category: "", question: "" });
    fetchAll();
  };

  const addFinding = async () => {
    await supabase.from("audit_findings").insert({
      audit_id: auditId!,
      title: findingForm.title,
      description: findingForm.description || null,
      severity: findingForm.severity as any,
      checkpoint_id: findingForm.checkpoint_id || null,
    });
    setShowAddFinding(false);
    setFindingForm({ title: "", description: "", severity: "observation", checkpoint_id: "" });
    toast({ title: "Finding added" });
    fetchAll();
  };

  const updateAuditStatus = async (status: string) => {
    await supabase.from("audits").update({
      status: status as any,
      ...(status === "completed" ? { completed_date: new Date().toISOString().split("T")[0] } : {}),
    }).eq("id", auditId!);
    toast({ title: `Audit ${status}` });
    fetchAll();
  };

  if (!audit) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  const grouped = checkpoints.reduce((acc, cp) => {
    if (!acc[cp.category]) acc[cp.category] = [];
    acc[cp.category].push(cp);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{(audit.suppliers as any)?.name}</h1>
          <p className="text-muted-foreground">
            {audit.audit_type} audit • {audit.standard || "N/A"} • {(audit.suppliers as any)?.city}
          </p>
        </div>
        <div className="flex gap-2">
          {audit.status === "planned" && (
            <Button onClick={() => updateAuditStatus("in_progress")}>Start Audit</Button>
          )}
          {audit.status === "in_progress" && (
            <Button onClick={() => updateAuditStatus("completed")} variant="outline">Complete Audit</Button>
          )}
        </div>
      </div>

      {/* Checkpoints */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Checkpoints</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setShowAddCheckpoint(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(grouped).map(([category, cps]) => (
            <div key={category}>
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">{category}</h3>
              <div className="space-y-2">
                {(cps as any[]).map((cp) => (
                  <div key={cp.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {statusIcon(cp.status)}
                      <span className="text-sm">{cp.question}</span>
                    </div>
                    <Select value={cp.status} onValueChange={(v) => updateCheckpointStatus(cp.id, v)}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                        <SelectItem value="observation">Observation</SelectItem>
                        <SelectItem value="na">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {checkpoints.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No checkpoints yet. Add checkpoints to start the audit checklist.</p>
          )}
        </CardContent>
      </Card>

      {/* Findings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Findings</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setShowAddFinding(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {findings.map((f) => (
              <div key={f.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{f.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    f.severity === "critical" ? "bg-red-100 text-red-700" :
                    f.severity === "major" ? "bg-orange-100 text-orange-700" :
                    f.severity === "minor" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>{f.severity}</span>
                </div>
                {f.description && <p className="text-sm text-muted-foreground mt-1">{f.description}</p>}
              </div>
            ))}
            {findings.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No findings recorded yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Checkpoint Dialog */}
      <Dialog open={showAddCheckpoint} onOpenChange={setShowAddCheckpoint}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Checkpoint</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Category</Label><Input value={cpForm.category} onChange={(e) => setCpForm({...cpForm, category: e.target.value})} placeholder="e.g. Quality Management, Process Control" /></div>
            <div><Label>Question / Check Item</Label><Input value={cpForm.question} onChange={(e) => setCpForm({...cpForm, question: e.target.value})} placeholder="e.g. Is SPC implemented for critical dimensions?" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCheckpoint(false)}>Cancel</Button>
            <Button onClick={addCheckpoint} disabled={!cpForm.category || !cpForm.question}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Finding Dialog */}
      <Dialog open={showAddFinding} onOpenChange={setShowAddFinding}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Finding</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title</Label><Input value={findingForm.title} onChange={(e) => setFindingForm({...findingForm, title: e.target.value})} /></div>
            <div><Label>Description</Label><Textarea value={findingForm.description} onChange={(e) => setFindingForm({...findingForm, description: e.target.value})} /></div>
            <div>
              <Label>Severity</Label>
              <Select value={findingForm.severity} onValueChange={(v) => setFindingForm({...findingForm, severity: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="observation">Observation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFinding(false)}>Cancel</Button>
            <Button onClick={addFinding} disabled={!findingForm.title}>Add Finding</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AtlasAuditDetail;
