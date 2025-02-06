
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const QuizQuestion = ({ question, options, onAnswer }: QuizQuestionProps) => {
  return (
    <Card className="bg-[#242424] mx-4 border-0">
      <CardHeader>
        <CardTitle className="text-white text-lg">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={onAnswer}
          className="space-y-2"
        >
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center bg-[#3f3f3f] p-3 rounded-lg cursor-pointer hover:bg-gray-800"
            >
              <RadioGroupItem value={option} id={option} className="hidden" />
              <label htmlFor={option} className="text-white cursor-pointer flex-1 text-sm">
                {option}
              </label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
