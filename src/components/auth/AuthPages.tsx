import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity, Upload, Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoadingScreen from './LoadingScreen';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  occupation: z.string().min(2, 'Occupation is required'),
  aadhar: z.string().regex(/^\d{12}$/, 'Aadhar must be 12 digits'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignupData = z.infer<typeof signupSchema>;
type LoginData = z.infer<typeof loginSchema>;

interface AuthPagesProps {
  onAuthComplete: (userData: any) => void;
}

const AuthPages: React.FC<AuthPagesProps> = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (data: SignupData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        ...data,
        profileImage,
        id: 'user_' + Date.now(),
      };
      onAuthComplete(userData);
    }, 3000);
  };

  const handleLogin = (data: LoginData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: 'John Doe',
        email: data.email,
        profileImage: profileImage || '/api/placeholder/150/150',
        id: 'user_' + Date.now(),
      };
      onAuthComplete(userData);
    }, 3000);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      const userData = {
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        profileImage: '/api/placeholder/150/150',
        id: 'user_' + Date.now(),
        provider,
      };
      onAuthComplete(userData);
    }, 2000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-farm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-strong border-0">
          <CardHeader className="text-center space-y-4">
            <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Welcome Back' : 'Join BioSync 360'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      {...loginForm.register('email')}
                      className="mt-1"
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        {...loginForm.register('password')}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Sign In
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={signupForm.handleSubmit(handleSignup)}
                  className="space-y-4"
                >
                  {/* Profile Picture Upload */}
                  <div className="text-center">
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden border-2 border-dashed border-border hover:border-primary transition-colors">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">Profile Picture</span>
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...signupForm.register('name')}
                      className="mt-1"
                    />
                    {signupForm.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      {...signupForm.register('occupation')}
                      className="mt-1"
                    />
                    {signupForm.formState.errors.occupation && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.occupation.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="aadhar">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      {...signupForm.register('aadhar')}
                      className="mt-1"
                      placeholder="12 digit Aadhar number"
                    />
                    {signupForm.formState.errors.aadhar && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.aadhar.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...signupForm.register('email')}
                      className="mt-1"
                    />
                    {signupForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...signupForm.register('password')}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signupForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Create Account
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin('Google')}
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin('Facebook')}
                  className="w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPages;