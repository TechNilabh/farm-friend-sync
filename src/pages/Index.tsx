import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import GuideSection from '@/components/GuideSection';
import SetupSection from '@/components/SetupSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const setupRef = useRef<HTMLDivElement>(null);

  const scrollToSetup = () => {
    setupRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection onGetStarted={scrollToSetup} />
        <FeaturesSection />
        <GuideSection />
        <div ref={setupRef}>
          <SetupSection />
        </div>
        <SuccessStoriesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
