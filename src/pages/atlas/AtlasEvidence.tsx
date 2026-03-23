import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";

const AtlasEvidence = () => {
  const [uploading, setUploading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setUploading(true);
    setAiAnalysis(null);

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    try {
      // Upload to storage
      const filePath = `evidence/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("audit-evidence")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      toast({ title: "File uploaded", description: "Analyzing with AI..." });

      // Call AI for analysis
      const { data: aiData, error: aiError } = await supabase.functions.invoke("analyze-evidence", {
        body: { fileName: file.name, filePath, mimeType: file.type },
      });

      if (aiError) {
        console.error("AI analysis error:", aiError);
        setAiAnalysis("AI analysis is not available yet. Deploy the analyze-evidence edge function to enable this feature.");
      } else {
        setAiAnalysis(aiData?.analysis || "No analysis returned.");
      }
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Evidence Upload</h1>
        <p className="text-muted-foreground">Upload audit photos or documents for AI analysis</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Uploading and analyzing...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Drop audit evidence here</p>
                <p className="text-sm text-muted-foreground">Photos, inspection reports, or process documents</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {previewUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileImage className="h-5 w-5" /> Uploaded Evidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img src={previewUrl} alt="Evidence preview" className="max-h-64 rounded-lg object-contain" />
          </CardContent>
        </Card>
      )}

      {aiAnalysis && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">🤖 AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-sm whitespace-pre-wrap">{aiAnalysis}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AtlasEvidence;
