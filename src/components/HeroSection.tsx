import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';
import cowGrazing from '@/assets/cow-grazing.jpg';
import dogEating from '@/assets/dog-eating.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-farm" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Animal - Cow */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.img 
                src={cowGrazing}
                alt="Cow grazing peacefully"
                className="w-64 h-48 object-cover rounded-2xl shadow-strong"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Center Content */}
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="text-primary">BioSync 360</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-muted-foreground font-medium"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Future of Vet Care
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                variant="hero" 
                size="xl"
                onClick={onGetStarted}
                className="animate-pulse-glow"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Right Animal - Dog */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.img 
                src={dogEating}
                alt="Dog eating meal"
                className="w-64 h-48 object-cover rounded-2xl shadow-strong"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full animate-pulse" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-4 h-4 bg-accent rounded-full opacity-60"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-6 h-6 bg-primary rounded-full opacity-40"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default HeroSection;