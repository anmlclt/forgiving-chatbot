
import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Church, SendHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInterface = ({ messages, message, onMessageChange, onSendMessage }: ChatInterfaceProps) => {
  const { toast } = useToast();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <>
      <Card className="mb-4 bg-[#1A1F2C] border border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Church className="h-6 w-6" />
            <CardTitle>Spiritual Guidance</CardTitle>
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
                placeholder="Ask for spiritual guidance..."
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                onClick={onSendMessage}
                disabled={!message.trim()}
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
