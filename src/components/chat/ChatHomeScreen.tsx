
import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, MessageSquare, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface ChatHistory {
  id: string;
  message: string;
  created_at: string;
  is_user_message: boolean;
  user_id?: string;
}

const ChatHomeScreen = ({ onStartChat, messages, onBack, onViewAllChats }: ChatHomeScreenProps) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_user_message', true)
        .order('created_at', { ascending: false })
        .limit(2);

      if (error) {
        console.error('Error fetching chat history:', error);
        return;
      }

      if (data) {
        const uniqueMessages = data.filter((message, index, self) =>
          index === self.findIndex((m) => m.message === message.message)
        );
        setChatHistory(uniqueMessages);
      }
    };

    fetchChatHistory();
  }, [user]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onStartChat(message);
    }
  };

  const predefinedPrompts = [
    { icon: <MessageSquare className="h-5 w-5 text-white" />, text: "Scripture Study", description: "Explore the Bible with AI guidance", prompt: "Help me study the scriptures" },
    { icon: <MessageSquare className="h-5 w-5 text-white" />, text: "Daily Prayer", description: "AI-guided spiritual reflection", prompt: "Guide me in my daily prayer" }
  ];

  return (
    <div className="min-h-screen bg-[#D3E4FD] p-4">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          className="text-[#1c20fe] p-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="text-[#1c20fe]">
          <User className="h-6 w-6" />
        </Button>
      </div>

      <Card className="bg-[#1c20fe] text-white p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Premium Plan</h2>
            <p className="text-sm opacity-90">Unlock your AI priest & get all premium features</p>
            <Button variant="secondary" className="mt-4 bg-white text-[#1c20fe] hover:bg-white/90">
              Upgrade plan
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {predefinedPrompts.map((prompt, index) => (
          <Card 
            key={index}
            className="bg-[#1c20fe] p-4 rounded-xl cursor-pointer hover:bg-[#1c20fe]/90 transition-colors"
            onClick={() => onStartChat(prompt.prompt)}
          >
            <div className="flex flex-col h-full">
              <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                {prompt.icon}
              </div>
              <h3 className="text-white font-medium mb-1">{prompt.text}</h3>
              <p className="text-sm text-white/70">{prompt.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#1c20fe] text-lg font-medium">Recent history</h3>
          <Button 
            variant="ghost" 
            className="text-[#1c20fe]"
            onClick={onViewAllChats}
          >
            See all
          </Button>
        </div>
        <div className="space-y-3">
          {chatHistory.map((chat) => (
            <Card 
              key={chat.id}
              className="bg-[#1c20fe] p-3 rounded-xl cursor-pointer hover:bg-[#1c20fe]/90 transition-colors"
              onClick={() => onStartChat(chat.message)}
            >
              <div className="flex items-center text-white">
                <span className="text-sm line-clamp-1">{chat.message}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#D3E4FD]">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a prompt here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#1c20fe] border-none text-white placeholder-white/70"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-[#1c20fe] hover:bg-[#1c20fe]/90 text-white rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHomeScreen;
