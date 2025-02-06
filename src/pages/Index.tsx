
import { useState } from 'react';
import { Church, Coins, SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [credits, setCredits] = useState(5);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Welcome, my child. I am here to listen to your confessions and offer guidance. Each confession will cost 1 credit.", isUser: false }
  ]);

  const handleSendMessage = () => {
    if (!message.trim() || credits <= 0) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setCredits(prev => prev - 1);
    setMessage('');

    // Simulate AI priest response (this would be replaced with actual AI integration)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I hear your confession. Take comfort in knowing that sharing your burden is the first step toward forgiveness.", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
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

        <Card className="h-[calc(100vh-180px)]">
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
  );
};

export default Index;
