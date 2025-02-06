
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
import { Card, CardContent } from "@/components/ui/card";

interface ConfessionFlowProps {
  onNavigateToChat: () => void;
}

const ConfessionFlow = ({ onNavigateToChat }: ConfessionFlowProps) => {
  const {
    currentQuizStep,
    showDisclaimerScreen,
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
    setShowKeepPraying,
    startConfession
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

  if (showDisclaimerScreen) {
    return (
      <>
        {renderTopNavbar()}
        <Card className="bg-[#3f3f3f] backdrop-blur">
          <CardContent className="pt-6 text-center space-y-6">
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/bible.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvYmlibGUuc3ZnIiwiaWF0IjoxNzM4ODYwMjMyLCJleHAiOjE3NzAzOTYyMzJ9.MnM6EpyMRAKdNegi0ohGv6yRuqGxQJrwtA5zHt7AFGA"
              alt="Bible"
              className="w-20 h-20 mx-auto mb-4 [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(44%)_saturate(6048%)_hue-rotate(232deg)_brightness(92%)_contrast(93%)]"
            />
            <h2 className="text-2xl font-semibold mb-4 text-white">Before You Begin</h2>
            <p className="text-base leading-relaxed text-gray-200">
              In the presence of our Lord Jesus Christ, take a moment to truly reflect on your actions. 
              True confession requires a sincere heart and genuine remorse for our sins. 
              Remember that God's mercy is infinite, but we must approach confession with 
              humility and a genuine desire for redemption.
            </p>
            <Button 
              className="w-full mt-6 bg-[#6b5de6] hover:bg-[#6b5de6]/90" 
              onClick={startConfession}
            >
              Begin Confession
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

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
    const currentQuestion = quizQuestions[currentQuizStep];
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

