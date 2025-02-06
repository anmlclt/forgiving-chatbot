
import { supabase } from "@/integrations/supabase/client";

export interface SinAnalysis {
  analysis: string;
  forgiveness_status: string;
}

export const analyzeSin = async (sinDescription: string): Promise<SinAnalysis> => {
  const { data, error } = await supabase.functions.invoke('analyze-sin', {
    body: { sinDescription }
  });

  if (error) throw error;
  return data as SinAnalysis;
};
