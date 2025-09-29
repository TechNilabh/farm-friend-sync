import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Activity } from 'lucide-react';

interface NavbarProps {
  userProfileImage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userProfileImage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-glass border-b border-white/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BioSync 360</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant={location.pathname === '/' ? "hero" : "glass"} 
              size="sm" 
              className={`flex items-center space-x-2 ${location.pathname === '/' ? 'ring-2 ring-primary/30' : ''}`}
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button 
              variant={location.pathname === '/profile' ? "hero" : "glass"} 
              size="sm" 
              className={`flex items-center space-x-2 ${location.pathname === '/profile' ? 'ring-2 ring-primary/30' : ''}`}
              onClick={() => navigate('/profile')}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Button>
            <Button 
              variant={location.pathname === '/tracker' ? "hero" : "glass"} 
              size="sm" 
              className={`flex items-center space-x-2 ${location.pathname === '/tracker' ? 'ring-2 ring-primary/30' : ''}`}
              onClick={() => navigate('/tracker')}
            >
              <Activity className="w-4 h-4" />
              <span>Tracker</span>
            </Button>
          </div>

          {/* Profile Avatar */}
          <motion.div 
            className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {userProfileImage ? (
              <img 
                src={userProfileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;