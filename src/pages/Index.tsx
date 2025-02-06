
import { useState } from 'react';
import ChatInterface from "@/components/chat/ChatInterface";
import WelcomeScreen from "@/components/home/WelcomeScreen";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import ConfessionFlow from "@/components/confession/ConfessionFlow";

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
              credits={credits}
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
