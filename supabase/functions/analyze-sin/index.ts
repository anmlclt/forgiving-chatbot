
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

    // Create system prompt for analyzing sins
    const systemPrompt = `You are a wise and compassionate spiritual advisor. Your role is to:
1. Analyze the described sin with empathy and understanding
2. Provide a thoughtful analysis of the moral implications
3. Offer guidance for forgiveness and personal growth
4. Determine if immediate forgiveness is warranted or if more reflection is needed

If the sin description shows genuine remorse and understanding, mark it as "FORGIVEN".
If there's lack of remorse or understanding, mark it as "NEEDS_REFLECTION".

Format your response in JSON with these fields:
- analysis: your detailed analysis of the sin and guidance
- forgiveness_status: either "FORGIVEN" or "NEEDS_REFLECTION"`;

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
