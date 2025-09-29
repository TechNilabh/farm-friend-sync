import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tracker from "./pages/Tracker";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/auth/AuthModal";
import AuthPages from "./components/auth/AuthPages";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAuthPages, setShowAuthPages] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user needs authentication
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setShowAuthModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleAuthModalProceed = () => {
    setShowAuthModal(false);
    setShowAuthPages(true);
  };

  const handleAuthComplete = (user: any) => {
    setUserData(user);
    setIsAuthenticated(true);
    setShowAuthPages(false);
  };

  if (showAuthPages) {
    return <AuthPages onAuthComplete={handleAuthComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index userProfileImage={userData?.profileImage} />} />
            <Route path="/tracker" element={<Tracker userProfileImage={userData?.profileImage} />} />
            <Route path="/profile" element={<Profile userProfileImage={userData?.profileImage} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        <AuthModal 
          open={showAuthModal}
          onOpenChange={setShowAuthModal}
          onProceed={handleAuthModalProceed}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
