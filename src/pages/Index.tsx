
import { useState } from 'react';
import { Church, Coins, SendHorizontal, MessageSquare, User, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [credits, setCredits] = useState(5);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Welcome, my child. I am here to listen to your confessions and offer guidance. Each confession will cost 1 credit.", isUser: false }
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);

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

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 flex items-center justify-around px-4">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Church className="h-6 w-6" />
                <CardTitle>Forgive My Sins</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">{credits} credits</span>
              </div>
            </CardHeader>
          </Card>

          <Card className="h-[calc(100vh-250px)]">
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
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4 mt-auto">
                <div className="flex gap-2">
                  <Input
                    placeholder={credits > 0 ? "Type your confession..." : "Out of credits"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={credits <= 0}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || credits <= 0}
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 flex items-center justify-around px-4">
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('home')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">Chat</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
