import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Supplier {
  id: string;
  name: string;
  city: string | null;
  industry: string | null;
  sub_industry: string | null;
  employee_count: number | null;
  certifications: string[];
  oib: string | null;
  contact_email: string | null;
}

const AtlasSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", industry: "", sub_industry: "", employee_count: "", oib: "", contact_email: "", certifications: "" });

  const fetchSuppliers = async () => {
    let query = supabase.from("suppliers").select("*").order("name");
    if (search) query = query.ilike("name", `%${search}%`);
    const { data } = await query.limit(100);
    setSuppliers((data as Supplier[]) || []);
  };

  useEffect(() => { fetchSuppliers(); }, [search]);

  const handleAdd = async () => {
    const { error } = await supabase.from("suppliers").insert({
      name: form.name,
      city: form.city || null,
      industry: form.industry || null,
      sub_industry: form.sub_industry || null,
      employee_count: form.employee_count ? parseInt(form.employee_count) : null,
      oib: form.oib || null,
      contact_email: form.contact_email || null,
      certifications: form.certifications ? form.certifications.split(",").map(s => s.trim()) : [],
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Supplier added" });
      setShowAdd(false);
      setForm({ name: "", city: "", industry: "", sub_industry: "", employee_count: "", oib: "", contact_email: "", certifications: "" });
      fetchSuppliers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Croatian manufacturing companies database</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Supplier
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base truncate">{s.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{s.city || "Croatia"} • {s.industry || "Manufacturing"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {s.certifications && s.certifications.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {s.certifications.slice(0, 3).map((cert) => (
                    <span key={cert} className="text-xs px-2 py-0.5 bg-muted rounded">{cert}</span>
                  ))}
                </div>
              )}
              {s.employee_count && (
                <p className="text-xs text-muted-foreground mt-2">{s.employee_count} employees</p>
              )}
            </CardContent>
          </Card>
        ))}
        {suppliers.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No suppliers found. Add your first supplier to get started.
          </div>
        )}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Supplier</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Company Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></div>
            <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="e.g. Zagreb, Split, Slavonski Brod" /></div>
            <div><Label>Industry</Label><Input value={form.industry} onChange={(e) => setForm({...form, industry: e.target.value})} placeholder="e.g. Automotive, Metalworking" /></div>
            <div><Label>Sub-Industry</Label><Input value={form.sub_industry} onChange={(e) => setForm({...form, sub_industry: e.target.value})} placeholder="e.g. Injection Molding" /></div>
            <div><Label>Employee Count</Label><Input type="number" value={form.employee_count} onChange={(e) => setForm({...form, employee_count: e.target.value})} /></div>
            <div><Label>OIB (Tax ID)</Label><Input value={form.oib} onChange={(e) => setForm({...form, oib: e.target.value})} /></div>
            <div><Label>Contact Email</Label><Input type="email" value={form.contact_email} onChange={(e) => setForm({...form, contact_email: e.target.value})} /></div>
            <div><Label>Certifications (comma separated)</Label><Input value={form.certifications} onChange={(e) => setForm({...form, certifications: e.target.value})} placeholder="ISO 9001, IATF 16949" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!form.name}>Add Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AtlasSuppliers;
