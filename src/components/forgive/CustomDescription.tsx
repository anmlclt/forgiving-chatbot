
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface CustomDescriptionProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  isAnalyzing?: boolean;
}

const CustomDescription = ({ 
  description, 
  onDescriptionChange, 
  onSubmit,
  isAnalyzing = false 
}: CustomDescriptionProps) => {
  return (
    <Card className="bg-[#1A1F2C] border border-gray-700/50 mx-4">
      <CardHeader>
        <CardTitle className="text-white text-lg">
          Describe your sin in detail <span className="text-[#9b87f5]">*</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Share your thoughts..."
          className="bg-[#242424] border-gray-700/50 text-white placeholder-gray-400 min-h-[120px]"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          required
          disabled={isAnalyzing}
        />
        <Button
          onClick={() => {
            if (description.trim()) {
              onSubmit();
            }
          }}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
          disabled={!description.trim() || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Seek Forgiveness'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomDescription;
