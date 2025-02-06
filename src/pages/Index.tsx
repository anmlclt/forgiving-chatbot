
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/forgive/QuizQuestion";
import CustomDescription from "@/components/forgive/CustomDescription";
import CrossAnimation from "@/components/forgive/CrossAnimation";
import SuccessScreen from "@/components/forgive/SuccessScreen";
import ChatInterface from "@/components/chat/ChatInterface";
import WelcomeScreen from "@/components/home/WelcomeScreen";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Index = () => {
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

  const handleGetStarted = () => {
    setShowWelcome(false);
    setActiveTab('chat');
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
      setCurrentQuizStep(quizQuestions.length);
    }
  };

  const handleSubmitSin = () => {
    setShowCross(true);
    setTimeout(() => {
      setShowCross(false);
      setShowSuccess(true);
    }, 3000);
  };

  const renderForgiveContent = () => {
    if (showCross) return <CrossAnimation />;
    if (showSuccess) {
      return (
        <SuccessScreen 
          customDescription={customDescription}
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
            onTabChange={setActiveTab}
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
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;
