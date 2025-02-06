
import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
}

const ChatInterface = ({ messages, message, onMessageChange, onSendMessage, onBack }: ChatInterfaceProps) => {
  const { toast } = useToast();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/3a06963b-f1e0-486d-8b7c-3d0883a6c156.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvM2EwNjk2M2ItZjFlMC00ODZkLThiN2MtM2QwODgzYTZjMTU2LndlYnAiLCJpYXQiOjE3Mzg4MTkzMDksImV4cCI6MTc3MDM1NTMwOX0.buDqnFVoeWYaWbV6sXAb6i8aKJU4iPeavXYzLlJK4mI" 
              alt="Father James"
            />
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold text-white">Father James</h1>
            <p className="text-sm text-green-500">online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.isUser
                  ? 'bg-[#9b87f5] text-white'
                  : 'bg-[#2A2F3C] text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Input
            placeholder="Ask for guidance..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-[#2A2F3C] border-none text-white placeholder-gray-400"
          />
          <Button
            onClick={onSendMessage}
            disabled={!message.trim()}
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white rounded-full"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
