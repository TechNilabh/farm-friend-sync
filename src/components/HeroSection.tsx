import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const VIDEO_URL =
  'https://res.cloudinary.com/dg361q5uv/video/upload/v1759143510/Sunny_Farm_Scene_with_Smart_Tech_lzkxwv.mp4';

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [blurVideo, setBlurVideo] = useState(false);
  const [firstPlayDone, setFirstPlayDone] = useState(false);

  useEffect(() => {
    const handleEnded = () => {
      if (!firstPlayDone) {
        setBlurVideo(true);
        setTimeout(() => setShowContent(true), 350);
        setFirstPlayDone(true);
        if (videoRef.current) {
          videoRef.current.loop = true;
          videoRef.current.play();
        }
      }
    };
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    }
  }, [firstPlayDone]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-0 m-0">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${blurVideo ? 'blur-sm opacity-80' : 'opacity-100'}`}
        style={{ zIndex: 1 }}
      />

      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Central Content */}
      {showContent && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <motion.h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight text-center drop-shadow-lg"
            style={{
              background: 'linear-gradient(90deg, #00FFD0 0%, #00A2FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'white',
              textShadow: '0 2px 16px rgba(0,255,208,0.4), 0 1px 2px #000',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #FF6B00 0%, #FFD600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'white',
            }}>
              BioSync 360
            </span>
          </motion.h1>
          <motion.p
            className="text-2xl font-semibold mt-6 text-center drop-shadow-md"
            style={{
              color: '#00FFD0',
              textShadow: '0 2px 8px rgba(0,255,208,0.3), 0 1px 2px #000',
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Future of Vet Care
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#FF6B00] to-[#FFD600] text-white font-bold px-10 py-5 rounded-full shadow-lg hover:scale-105 transition-transform animate-pulse-glow"
              style={{
                boxShadow: '0 0 24px 4px #FFD60088, 0 2px 8px #000',
                fontSize: '1.5rem',
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;