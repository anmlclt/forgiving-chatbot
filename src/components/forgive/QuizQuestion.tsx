
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const QuizQuestion = ({ question, options, onAnswer }: QuizQuestionProps) => {
  return (
    <Card className="bg-[#242424] border border-gray-700 mx-4">
      <CardHeader>
        <CardTitle className="text-white text-lg">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={onAnswer}
          className="space-y-3"
        >
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center space-x-2 bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-800"
            >
              <RadioGroupItem value={option} id={option} className="text-[#F97316]" />
              <label htmlFor={option} className="text-white cursor-pointer flex-1">
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
