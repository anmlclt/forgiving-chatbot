
import { useConfessionFlow } from "@/hooks/useConfessionFlow";
import QuizQuestion from "@/components/forgive/QuizQuestion";
import CustomDescription from "@/components/forgive/CustomDescription";
import CrossAnimation from "@/components/forgive/CrossAnimation";
import SuccessScreen from "@/components/forgive/SuccessScreen";
import KeepPrayingScreen from "@/components/forgive/KeepPrayingScreen";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { useProfile } from "@/hooks/useProfile";

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

  const { user } = useAuth();
  const { profile } = useProfile(user?.id);

  const renderTopNavbar = () => (
    <div className="flex justify-between items-center mb-6">
      <Button 
        variant="ghost" 
        className="text-white p-2"
        onClick={resetFlow}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Avatar className="h-10 w-10">
        <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
        <AvatarFallback>
          {user?.email?.charAt(0).toUpperCase() || '?'}
        </AvatarFallback>
      </Avatar>
    </div>
  );

  if (showCross) return <CrossAnimation />;
  
  if (showSuccess) {
    return (
      <>
        {renderTopNavbar()}
        <SuccessScreen 
          customDescription={customDescription}
          analysis={analysis?.analysis}
          onReturn={resetFlow}
        />
      </>
    );
  }

  if (showKeepPraying) {
    return (
      <>
        {renderTopNavbar()}
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
      </>
    );
  }

  if (currentQuizStep < quizQuestions.length) {
    return (
      <>
        {renderTopNavbar()}
        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleQuizAnswer}
        />
      </>
    );
  }

  return (
    <>
      {renderTopNavbar()}
      <CustomDescription
        description={customDescription}
        onDescriptionChange={setCustomDescription}
        onSubmit={handleSubmitSin}
        isAnalyzing={isAnalyzing}
      />
    </>
  );
};

export default ConfessionFlow;
