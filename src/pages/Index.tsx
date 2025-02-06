import { useState } from 'react';
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/forgive/QuizQuestion";
import CustomDescription from "@/components/forgive/CustomDescription";
import CrossAnimation from "@/components/forgive/CrossAnimation";
import SuccessScreen from "@/components/forgive/SuccessScreen";
import ChatInterface from "@/components/chat/ChatInterface";
import WelcomeScreen from "@/components/home/WelcomeScreen";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import KeepPrayingScreen from "@/components/forgive/KeepPrayingScreen";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [credits, setCredits] = useState(5);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Welcome, my child. I am here to listen to your confessions and offer guidance. Each confession will cost 1 credit.", isUser: false }
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    sinType: '',
    severity: '',
    frequency: '',
    regret: ''
  });
  const [customDescription, setCustomDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [showKeepPraying, setShowKeepPraying] = useState(false);
  const [analysis, setAnalysis] = useState<{ analysis: string; forgiveness_status: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim() || credits <= 0) return;
    
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setCredits(prev => prev - 1);
    setMessage('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I hear your confession. Take comfort in knowing that sharing your burden is the first step toward forgiveness.", 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleGetStarted = (screen: string = 'forgive') => {
    setShowWelcome(false);
    setActiveTab(screen);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      setShowWelcome(true);
      setActiveTab('home');
    } else {
      setShowWelcome(false);
      setActiveTab(tab);
    }
  };

  const quizQuestions = [
    {
      question: "What area of sin are you seeking forgiveness for?",
      options: ["Pride", "Greed", "Envy", "Wrath", "Lust", "Gluttony", "Sloth"],
      key: "sinType"
    },
    {
      question: "How severe do you consider this sin?",
      options: ["Minor transgression", "Moderate sin", "Serious violation", "Grave sin"],
      key: "severity"
    },
    {
      question: "How often does this sin occur?",
      options: ["Once", "Occasionally", "Frequently", "Constantly"],
      key: "frequency"
    },
    {
      question: "Do you truly regret this sin?",
      options: ["Yes, deeply", "Somewhat", "Not sure", "No"],
      key: "regret"
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    const currentQuestion = quizQuestions[currentQuizStep];
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestion.key]: answer
    }));
    
    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(prev => prev + 1);
    } else {
      // Check if the user selected "Not sure" or "No" for regret
      if (currentQuestion.key === 'regret' && (answer === 'Not sure' || answer === 'No')) {
        setShowKeepPraying(true);
      } else {
        setCurrentQuizStep(quizQuestions.length);
      }
    }
  };

  const handleSubmitSin = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-sin', {
        body: {
          sinDescription: customDescription
        }
      });

      if (error) throw error;

      const result = data;
      setAnalysis(result);

      if (result.forgiveness_status === 'NEEDS_REFLECTION') {
        setShowKeepPraying(true);
      } else {
        setShowCross(true);
        setTimeout(() => {
          setShowCross(false);
          setShowSuccess(true);
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze your confession. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderForgiveContent = () => {
    if (showCross) return <CrossAnimation />;
    if (showSuccess) {
      return (
        <SuccessScreen 
          customDescription={customDescription}
          analysis={analysis?.analysis}
          onReturn={() => {
            setShowSuccess(false);
            setCurrentQuizStep(0);
            setQuizAnswers({
              sinType: '',
              severity: '',
              frequency: '',
              regret: ''
            });
            setCustomDescription('');
            setAnalysis(null);
          }}
        />
      );
    }

    if (showKeepPraying) {
      return (
        <KeepPrayingScreen 
          onChatClick={() => {
            setShowKeepPraying(false);
            setActiveTab('chat');
            setCurrentQuizStep(0);
            setQuizAnswers({
              sinType: '',
              severity: '',
              frequency: '',
              regret: ''
            });
          }}
          onReturn={() => {
            setShowKeepPraying(false);
            setCurrentQuizStep(0);
            setQuizAnswers({
              sinType: '',
              severity: '',
              frequency: '',
              regret: ''
            });
          }}
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

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onGetStarted={handleGetStarted}
        renderBottomNavigation={() => (
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      <div className="flex-1 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          {activeTab === 'chat' ? (
            <ChatInterface
              messages={messages}
              credits={credits}
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
            />
          ) : activeTab === 'forgive' ? (
            renderForgiveContent()
          ) : null}
        </div>
      </div>
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Index;
