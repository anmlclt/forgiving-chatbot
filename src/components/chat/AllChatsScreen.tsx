
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface AllChatsScreenProps {
  onBack: () => void;
  onChatSelect: (message: string) => void;
}

interface ChatHistory {
  id: string;
  message: string;
  created_at: string;
  is_user_message: boolean;
  user_id?: string;
}

const AllChatsScreen = ({ onBack, onChatSelect }: AllChatsScreenProps) => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAllChats = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_user_message', true)
        .order('created_at', { ascending: false });

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

    fetchAllChats();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="text-white p-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-white text-xl font-semibold ml-2">Recent history</h2>
      </div>

      <div className="space-y-3">
        {chatHistory.map((chat) => (
          <Card 
            key={chat.id}
            className="bg-[#2A2F3C] p-3 rounded-xl cursor-pointer hover:bg-[#2A2F3C]/80 transition-colors"
            onClick={() => onChatSelect(chat.message)}
          >
            <div className="flex items-center text-white">
              <span className="text-sm line-clamp-1">{chat.message}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllChatsScreen;
