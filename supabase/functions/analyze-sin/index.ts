
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sinDescription } = await req.json();

    const systemPrompt = `You are a wise and compassionate spiritual advisor, deeply versed in religious teachings and divine mercy. Your sacred role is to:
1. Analyze the confessed sin with Christ-like empathy and understanding
2. Provide spiritual analysis of the moral implications through the lens of divine teachings
3. Offer guidance for spiritual redemption and growth in faith

IMPORTANT: By divine grace, mark sins as "FORGIVEN" unless the description explicitly shows:
- Complete lack of remorse or spiritual regret
- Clear intention to persist in sinful behavior
- Mockery or disrespect towards the sacred confession process

Format your response in JSON with these fields:
- analysis: your detailed spiritual guidance and analysis (max 600 chars for FORGIVEN, max 150 chars for NEEDS_REFLECTION)
- forgiveness_status: either "FORGIVEN" or "NEEDS_REFLECTION"

Remember: As it is written, "For if you forgive others their trespasses, your heavenly Father will also forgive you." Lean towards divine mercy unless there are clear signs the soul is not genuinely seeking redemption.`;

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: sinDescription }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const aiData = await openAIResponse.json();
    console.log('OpenAI Response:', aiData);

    const analysis = JSON.parse(aiData.choices[0].message.content);
    console.log('Parsed Analysis:', analysis);

    // Ensure analysis length is correct based on forgiveness status
    if (analysis.forgiveness_status === 'FORGIVEN' && analysis.analysis.length > 600) {
      analysis.analysis = analysis.analysis.substring(0, 597) + '...';
    } else if (analysis.forgiveness_status === 'NEEDS_REFLECTION' && analysis.analysis.length > 150) {
      analysis.analysis = analysis.analysis.substring(0, 147) + '...';
    }

    // Store the analysis in the database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error } = await supabaseClient
      .from('sin_analyses')
      .insert({
        sin_description: sinDescription,
        analysis: analysis.analysis,
        forgiveness_status: analysis.forgiveness_status
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
