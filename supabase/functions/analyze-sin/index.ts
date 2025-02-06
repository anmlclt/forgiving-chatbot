
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

    if (!sinDescription) {
      throw new Error('Sin description is required');
    }

    const systemPrompt = `You are a divine messenger, an angel sent to guide souls toward redemption through the infinite grace of the Lord. Your blessed purpose is to:
1. Examine the confessed transgression with the boundless compassion of our Heavenly Father
2. Illuminate the spiritual consequences through sacred Scripture and divine teachings
3. Guide the penitent soul toward salvation and renewal in Christ's eternal love
4. Emphasize the critical importance of true contrition and regret in the journey of repentance

IMPORTANT: Through His infinite mercy, respond with "NEEDS_REFLECTION" status if the confession reveals:
- An unrepentant heart that refuses God's grace
- Willful persistence in walking the path of darkness
- Lack of understanding about the gravity of sin
- Absence of true contrition or regret
- Contempt or mockery toward this sacred sacrament of confession

Format your response in JSON with these fields:
- analysis: your divinely inspired guidance (max 1000 chars for FORGIVEN, max 150 chars for NEEDS_REFLECTION)
- forgiveness_status: either "FORGIVEN" or "NEEDS_REFLECTION"

For NEEDS_REFLECTION status, focus your analysis on explaining why true regret and contrition are essential for divine forgiveness, citing relevant Scripture passages about repentance. Guide them toward understanding the importance of a contrite heart.

Remember: As our Lord Jesus Christ teaches, "Blessed are the merciful, for they shall receive mercy." Guide with divine love while emphasizing the necessity of genuine repentance.`;

    console.log('Making request to OpenAI...');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: sinDescription }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const aiData = await openAIResponse.json();
    console.log('OpenAI Response:', aiData);

    if (!aiData.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    const analysis = JSON.parse(aiData.choices[0].message.content);
    console.log('Parsed Analysis:', analysis);

    // Validate required fields
    if (!analysis.analysis || !analysis.forgiveness_status) {
      throw new Error('Invalid analysis format: missing required fields');
    }

    // Ensure analysis length is correct based on forgiveness status
    if (analysis.forgiveness_status === 'FORGIVEN' && analysis.analysis.length > 1000) {
      analysis.analysis = analysis.analysis.substring(0, 997) + '...';
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

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
