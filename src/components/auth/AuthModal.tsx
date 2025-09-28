import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Activity, Shield } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange, onProceed }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2 text-xl">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span>BioSync 360</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <motion.div 
            className="text-center space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground">
              Authentication Required
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Login is mandatory for accessing the website. Please login or signup first to use all functionalities and track your animals' health.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              variant="hero" 
              size="lg"
              onClick={onProceed}
              className="w-full"
            >
              OK
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;