
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Church, Coins, SendHorizontal } from "lucide-react";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  credits: number;
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInterface = ({ messages, credits, message, onMessageChange, onSendMessage }: ChatInterfaceProps) => {
  return (
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
                onChange={(e) => onMessageChange(e.target.value)}
                disabled={credits <= 0}
                onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                onClick={onSendMessage}
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
  );
};

export default ChatInterface;
