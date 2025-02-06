
import { useState } from 'react';
import ChatInterface from "@/components/chat/ChatInterface";
import WelcomeScreen from "@/components/home/WelcomeScreen";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import ConfessionFlow from "@/components/confession/ConfessionFlow";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Greetings, my child. I am here to provide spiritual guidance and support on your journey of faith. How may I assist you today?", isUser: false }
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setMessage('');

    try {
      const response = await fetch('${window.location.origin}/functions/v1/chat-with-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGetStarted = (screen: string = 'forgive') => {
    setShowWelcome(false);
    setActiveTab(screen);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      setShowWelcome(true);
      setActiveTab('home');
    } else {
      setShowWelcome(false);
      setActiveTab(tab);
    }
  };

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onGetStarted={handleGetStarted}
        renderBottomNavigation={() => (
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      <div className="flex-1 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          {activeTab === 'chat' ? (
            <ChatInterface
              messages={messages}
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
            />
          ) : activeTab === 'forgive' ? (
            <ConfessionFlow 
              onNavigateToChat={() => handleTabChange('chat')}
            />
          ) : null}
        </div>
      </div>
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Index;
