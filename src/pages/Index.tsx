import { useState } from 'react';
import { Church, Coins, SendHorizontal, MessageSquare, User, Home, HandHeart, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

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
    }, 2000);
  };

  const renderForgiveContent = () => {
    if (showCross) {
      return (
        <div className="fixed inset-0 bg-[#1A1F2C] flex items-center justify-center">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-2 bg-[#F97316] animate-fade-in" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-40 bg-[#F97316] animate-fade-in" />
          </div>
        </div>
      );
    }

    if (showSuccess) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6">
          <div className="w-24 h-24 rounded-full bg-[#F97316] flex items-center justify-center mb-8 animate-scale-in">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">Your Sin Has Been Forgiven</h2>
          <p className="text-gray-300 text-center mb-6 animate-fade-in">
            {customDescription 
              ? "Your personal reflection shows true remorse. Go forth and sin no more."
              : "Your confession has been heard. May peace be with you."}
          </p>
          <Button 
            onClick={() => {
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
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-white animate-scale-in"
          >
            Return to Home
          </Button>
        </div>
      );
    }

    if (currentQuizStep < quizQuestions.length) {
      const currentQuestion = quizQuestions[currentQuizStep];
      return (
        <Card className="bg-[#1A1F2C] border border-gray-700 mx-4">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={handleQuizAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
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
    }

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
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
          />
          <Button
            onClick={handleSubmitSin}
            className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white"
          >
            Seek Forgiveness
          </Button>
        </CardContent>
      </Card>
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
            <>
              <Card className="mb-4 bg-[#1A1F2C] border border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Church className="h-6 w-6" />
                    <CardTitle>Forgive My Sins</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Coins className="h-5 w-5 text-[#F97316]" />
                    <span className="font-semibold">{credits} credits</span>
                  </div>
                </CardHeader>
              </Card>

              <Card className="h-[calc(100vh-250px)] bg-[#1A1F2C] border border-gray-700">
                <CardContent className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.isUser
                              ? 'bg-[#F97316] text-white'
                              : 'bg-[#9b87f5] text-white'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 p-4 mt-auto">
                    <div className="flex gap-2">
                      <Input
                        placeholder={credits > 0 ? "Type your confession..." : "Out of credits"}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={credits <= 0}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || credits <= 0}
                        className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
                      >
                        <SendHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
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
