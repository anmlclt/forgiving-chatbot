
import { useConfessionFlow } from "@/hooks/useConfessionFlow";
import QuizQuestion from "@/components/forgive/QuizQuestion";
import CustomDescription from "@/components/forgive/CustomDescription";
import CrossAnimation from "@/components/forgive/CrossAnimation";
import SuccessScreen from "@/components/forgive/SuccessScreen";
import KeepPrayingScreen from "@/components/forgive/KeepPrayingScreen";

interface ConfessionFlowProps {
  onNavigateToChat: () => void;
}

const ConfessionFlow = ({ onNavigateToChat }: ConfessionFlowProps) => {
  const {
    currentQuizStep,
    customDescription,
    showSuccess,
    showCross,
    showKeepPraying,
    analysis,
    isAnalyzing,
    quizQuestions,
    handleQuizAnswer,
    handleSubmitSin,
    setCustomDescription,
    resetFlow,
    setShowKeepPraying
  } = useConfessionFlow();

  if (showCross) return <CrossAnimation />;
  
  if (showSuccess) {
    return (
      <SuccessScreen 
        customDescription={customDescription}
        analysis={analysis?.analysis}
        onReturn={resetFlow}
      />
    );
  }

  if (showKeepPraying) {
    return (
      <KeepPrayingScreen 
        onChatClick={() => {
          setShowKeepPraying(false);
          onNavigateToChat();
          resetFlow();
        }}
        onReturn={() => {
          setShowKeepPraying(false);
          resetFlow();
        }}
        analysis={analysis?.analysis}
      />
    );
  }

  if (currentQuizStep < quizQuestions.length) {
    const currentQuestion = quizQuestions[currentQuizStep];
    return (
      <QuizQuestion
        question={currentQuestion.question}
        options={currentQuestion.options}
        onAnswer={handleQuizAnswer}
      />
    );
  }

  return (
    <CustomDescription
      description={customDescription}
      onDescriptionChange={setCustomDescription}
      onSubmit={handleSubmitSin}
      isAnalyzing={isAnalyzing}
    />
  );
};

export default ConfessionFlow;
