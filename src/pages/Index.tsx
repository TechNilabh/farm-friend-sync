import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import GuideSection from '@/components/GuideSection';
import SetupSection from '@/components/SetupSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

interface IndexProps {
  userProfileImage?: string;
}

const Index: React.FC<IndexProps> = ({ userProfileImage }) => {
  const setupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isDeviceSynced, setIsDeviceSynced] = useState(false);

  const scrollToSetup = () => {
    setupRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleDeviceSync = () => {
    setIsDeviceSynced(true);
  };

  const handleNavigateToTracker = () => {
    navigate('/tracker');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userProfileImage={userProfileImage} />
      
      <main>
        <HeroSection onGetStarted={scrollToSetup} />
        <FeaturesSection />
        <GuideSection />
        <div ref={setupRef}>
          <SetupSection 
            isDeviceSynced={isDeviceSynced}
            onDeviceSync={handleDeviceSync}
            onNavigateToTracker={handleNavigateToTracker}
          />
        </div>
        <SuccessStoriesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
