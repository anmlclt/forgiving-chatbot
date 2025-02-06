
import React from 'react';
import { Menu, User, Pen, ImageIcon, History, MessageSquare, MicIcon, SendIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ChatHomeScreenProps {
  onStartChat: (message: string) => void;
}

const ChatHomeScreen = ({ onStartChat }: ChatHomeScreenProps) => {
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onStartChat(message);
    }
  };

  const predefinedPrompts = [
    "How can I strengthen my faith?",
    "Guide me through daily prayer"
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-4">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="text-white">
          <User className="h-6 w-6" />
        </Button>
      </div>

      <Card className="bg-[#6D5DE7] text-white p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Premium Plan</h2>
            <p className="text-sm opacity-90">Unlock your AI priest & get all premium features</p>
            <Button variant="secondary" className="mt-4 bg-white text-[#6D5DE7] hover:bg-white/90">
              Upgrade plan
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card 
          className="bg-[#2A2F3C] p-4 rounded-xl cursor-pointer hover:bg-[#2A2F3C]/80 transition-colors"
          onClick={() => onStartChat("Help me study the scriptures")}
        >
          <div className="flex flex-col h-full">
            <div className="bg-[#6D5DE7] w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-white font-medium mb-1">Scripture Study</h3>
            <p className="text-sm text-gray-400">Explore the Bible with AI guidance</p>
          </div>
        </Card>
        <Card 
          className="bg-[#2A2F3C] p-4 rounded-xl cursor-pointer hover:bg-[#2A2F3C]/80 transition-colors"
          onClick={() => onStartChat("Guide me in my daily prayer")}
        >
          <div className="flex flex-col h-full">
            <div className="bg-[#6D5DE7] w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-white font-medium mb-1">Daily Prayer</h3>
            <p className="text-sm text-gray-400">AI-guided spiritual reflection</p>
          </div>
        </Card>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-medium">Recent history</h3>
          <Button variant="ghost" className="text-[#6D5DE7]">
            See all
          </Button>
        </div>
        <div className="space-y-3">
          {predefinedPrompts.map((prompt, index) => (
            <Card 
              key={index}
              className="bg-[#2A2F3C] p-3 rounded-xl cursor-pointer hover:bg-[#2A2F3C]/80 transition-colors"
              onClick={() => onStartChat(prompt)}
            >
              <div className="flex items-center text-white">
                {index === 0 ? (
                  <MessageSquare className="h-5 w-5 mr-3" />
                ) : (
                  <MicIcon className="h-5 w-5 mr-3" />
                )}
                <span className="text-sm">{prompt}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1A1F2C]">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a prompt here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#2A2F3C] border-none text-white placeholder-gray-400"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-[#6D5DE7] hover:bg-[#6D5DE7]/90 text-white rounded-full"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHomeScreen;
