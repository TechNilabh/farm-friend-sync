import React from 'react';
import { motion } from 'framer-motion';
import loaderCow from '@/assets/loader-cow.jpg';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-farm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <motion.div
          className="relative w-32 h-32 mx-auto"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-strong">
            <img 
              src={loaderCow} 
              alt="Loading cow" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Grass animation effect */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-6 bg-primary/20 rounded-full blur-sm"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        <div className="space-y-4">
          <motion.h2 
            className="text-2xl font-bold text-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Welcome to BioSync 360
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            Setting up your account...
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: index * 0.2 
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;