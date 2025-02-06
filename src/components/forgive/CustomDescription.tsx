
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CustomDescriptionProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
}

const CustomDescription = ({ description, onDescriptionChange, onSubmit }: CustomDescriptionProps) => {
  return (
    <Card className="bg-[#1A1F2C] border border-gray-700 mx-4">
      <CardHeader>
        <CardTitle className="text-white text-lg">
          Would you like to add more details about your sin? (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Share your thoughts..."
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
        <Button
          onClick={onSubmit}
          className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white"
        >
          Seek Forgiveness
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomDescription;
