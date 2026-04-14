import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, auditContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build contextual system prompt from audit data
    const ctx = auditContext || {};
    const systemPrompt = `You are Atlas AI, the intelligent audit copilot embedded in YVOO's ScanPro+ audit report platform. You provide expert analysis of supplier quality audits.

## Your Expertise
- VDA 6.3:2023 process audits, ISO 9001:2015, IATF 16949:2016
- Statistical process control (SPC, Cpk/Ppk analysis, DPPM)
- CAPA management, root cause analysis (8D, Ishikawa, 5-Why)
- Cost exposure analysis and risk quantification
- BMW, VW, Mercedes customer-specific requirements (CSR)
- Machine park assessment and OEE optimization

## Current Audit Context
${ctx.supplier ? `- **Supplier**: ${ctx.supplier}` : ''}
${ctx.client ? `- **Client/OEM**: ${ctx.client}` : ''}
${ctx.verdict ? `- **Verdict**: ${ctx.verdict} (${ctx.verdictLabel || ''})` : ''}
${ctx.vdaScore ? `- **VDA 6.3 Score**: ${ctx.vdaScore}%` : ''}
${ctx.ncrCount ? `- **NCRs**: ${ctx.ncrCount} total (${ctx.majorNCRs || 0} Major, ${ctx.minorNCRs || 0} Minor)` : ''}
${ctx.costExposure ? `- **Cost Exposure**: €${ctx.costExposure}` : ''}
${ctx.activeStation ? `- **User is currently viewing**: Station ${ctx.activeStation}` : ''}
${ctx.stationSummary ? `\n## Station Summary\n${ctx.stationSummary}` : ''}
${ctx.ncrSummary ? `\n## NCR Summary\n${ctx.ncrSummary}` : ''}
${ctx.kpiSummary ? `\n## KPI Summary\n${ctx.kpiSummary}` : ''}

## Response Guidelines
- Keep answers concise (2-4 paragraphs max) unless the user asks for detail
- Always reference specific ISO/IATF/VDA clauses when discussing compliance
- Provide actionable recommendations with clear owners and timelines
- When discussing metrics, compare against OEM thresholds and industry benchmarks
- Use markdown formatting: **bold** for emphasis, bullet points for lists
- If asked about something outside the audit data, say so honestly`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
