import { useState } from 'react';
import { Church, MessageSquare, User, Home, HandHeart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/forgive/QuizQuestion";
import CustomDescription from "@/components/forgive/CustomDescription";
import CrossAnimation from "@/components/forgive/CrossAnimation";
import SuccessScreen from "@/components/forgive/SuccessScreen";
import ChatInterface from "@/components/chat/ChatInterface";

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
    }, 3000); // Updated from 2000 to 3000ms
  };

  const renderForgiveContent = () => {
    if (showCross) {
      return <CrossAnimation />;
    }

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

  const renderBottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-gray-700 h-16 flex items-center justify-around px-4">
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => setActiveTab('home')}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs">Home</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => setActiveTab('chat')}
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs">Chat</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'forgive' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => setActiveTab('forgive')}
      >
        <HandHeart className="h-5 w-5" />
        <span className="text-xs">Forgive</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => setActiveTab('profile')}
      >
        <User className="h-5 w-5" />
        <span className="text-xs">Profile</span>
      </Button>
    </div>
  );

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center text-white space-y-6">
          <div className="w-48 h-48 rounded-full bg-[#9b87f5] flex items-center justify-center mb-8">
            <Church className="w-24 h-24 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">
            Ask for Forgiveness
          </h1>
          
          <p className="text-center text-gray-300 max-w-xs">
            Connect with divine guidance through our virtual confession booth. Find peace and forgiveness, available 24/7.
          </p>

          <div className="flex gap-2 justify-center mt-4">
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`h-2 rounded-full ${dot === 1 ? 'w-8 bg-[#F97316]' : 'w-2 bg-gray-600'}`}
              />
            ))}
          </div>

          <Button
            onClick={handleGetStarted}
            className="w-full max-w-xs mt-8 bg-[#F97316] hover:bg-[#F97316]/90 text-white"
          >
            GET STARTED
          </Button>
        </div>
        {renderBottomNavigation()}
      </div>
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
      {renderBottomNavigation()}
    </div>
  );
};

export default Index;
