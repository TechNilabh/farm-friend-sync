import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Star, 
  Clock, 
  Wallet, 
  Heart, 
  Activity, 
  Thermometer,
  Settings,
  Monitor,
  CreditCard,
  Palette
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface ProfileProps {
  userProfileImage?: string;
}

interface Animal {
  id: string;
  name: string;
  image: string;
  isFavorite: boolean;
  healthStats: {
    heartRate: number;
    breathing: number;
    temperature: number;
    activity: number;
  };
  medicalHistory: {
    id: string;
    disease: string;
    diseaseImage: string;
    description: string;
    vetHospital: string;
    recoveryPercentage: number;
  }[];
}

interface RecentCase {
  id: string;
  name: string;
  image: string;
  currentDisease: string;
  diagnosis: string;
  medicalCare: string;
  recoveryPercentage: number;
  healthStats: {
    heartRate: number;
    breathing: number;
    temperature: number;
    activity: number;
  };
}

const mockFavoriteAnimals: Animal[] = [
  {
    id: '1',
    name: 'Bella',
    image: '/api/placeholder/200/150',
    isFavorite: true,
    healthStats: {
      heartRate: 72,
      breathing: 16,
      temperature: 38.5,
      activity: 78,
    },
    medicalHistory: [
      {
        id: '1',
        disease: 'Dehydration',
        diseaseImage: '/api/placeholder/100/80',
        description: 'Mild dehydration due to reduced water intake during hot weather.',
        vetHospital: 'Green Valley Veterinary Clinic - Dr. Rajesh Kumar',
        recoveryPercentage: 95,
      },
    ],
  },
  {
    id: '2',
    name: 'Max',
    image: '/api/placeholder/200/150',
    isFavorite: true,
    healthStats: {
      heartRate: 68,
      breathing: 18,
      temperature: 38.2,
      activity: 82,
    },
    medicalHistory: [
      {
        id: '1',
        disease: 'Minor Injury',
        diseaseImage: '/api/placeholder/100/80',
        description: 'Small cut on front leg, treated with antibiotics.',
        vetHospital: 'City Animal Hospital - Dr. Priya Sharma',
        recoveryPercentage: 100,
      },
    ],
  },
  {
    id: '3',
    name: 'Luna',
    image: '/api/placeholder/200/150',
    isFavorite: true,
    healthStats: {
      heartRate: 75,
      breathing: 20,
      temperature: 38.8,
      activity: 65,
    },
    medicalHistory: [
      {
        id: '1',
        disease: 'Digestive Issues',
        diseaseImage: '/api/placeholder/100/80',
        description: 'Stomach upset due to dietary changes, resolved with medication.',
        vetHospital: 'Farm Care Veterinary - Dr. Amit Patel',
        recoveryPercentage: 88,
      },
    ],
  },
];

const mockRecentCases: RecentCase[] = [
  {
    id: '1',
    name: 'Rocky',
    image: '/api/placeholder/200/150',
    currentDisease: 'Respiratory Infection',
    diagnosis: 'Bacterial infection in respiratory tract',
    medicalCare: 'Antibiotic treatment and rest prescribed',
    recoveryPercentage: 70,
    healthStats: {
      heartRate: 85,
      breathing: 24,
      temperature: 39.2,
      activity: 45,
    },
  },
  {
    id: '2',
    name: 'Daisy',
    image: '/api/placeholder/200/150',
    currentDisease: 'Joint Pain',
    diagnosis: 'Arthritis in hind legs',
    medicalCare: 'Anti-inflammatory medication and physiotherapy',
    recoveryPercentage: 60,
    healthStats: {
      heartRate: 70,
      breathing: 18,
      temperature: 38.3,
      activity: 35,
    },
  },
];

const Profile: React.FC<ProfileProps> = ({ userProfileImage }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [selectedCase, setSelectedCase] = useState<RecentCase | null>(null);
  const [animalModalOpen, setAnimalModalOpen] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Mock user data
  const userData = {
    name: 'Rajesh Kumar',
    aadharNumber: '1234 5678 9012',
    timeSpent: '45 hours',
    currentBalance: '₹2,450',
    memberSince: 'March 2024',
  };

  const handleAnimalClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setAnimalModalOpen(true);
  };

  const handleCaseClick = (caseItem: RecentCase) => {
    setSelectedCase(caseItem);
    setCaseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userProfileImage={userProfileImage} />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Profile Header */}
          <motion.div
            className="bg-card rounded-2xl p-8 shadow-medium mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <img
                  src={userProfileImage || '/api/placeholder/150/150'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-earth/20"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary-soft rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Aadhar Number</p>
                    <p className="font-semibold">{userData.aadharNumber}</p>
                  </div>
                  
                  <div className="bg-secondary-soft rounded-lg p-3">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Time on App
                    </p>
                    <p className="font-semibold">{userData.timeSpent}</p>
                  </div>
                  
                  <div className="bg-secondary-soft rounded-lg p-3">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Wallet className="w-4 h-4 mr-1" />
                      Current Balance
                    </p>
                    <p className="font-semibold text-success">{userData.currentBalance}</p>
                  </div>
                  
                  <div className="bg-secondary-soft rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-semibold">{userData.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animal Diary Section */}
          <motion.div
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Star className="w-6 h-6 text-warning" />
              <h2 className="text-2xl font-bold text-foreground">Animal Diary: A Personal Space</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFavoriteAnimals.map((animal) => (
                <motion.div
                  key={animal.id}
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-medium transition-all duration-300"
                    onClick={() => handleAnimalClick(animal)}
                  >
                    <CardContent className="p-6">
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img 
                          src={animal.image} 
                          alt={animal.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-center text-foreground">{animal.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Most Recent Cases Section */}
          <motion.div
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Most Recent Cases</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRecentCases.map((caseItem) => (
                <motion.div
                  key={caseItem.id}
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-medium transition-all duration-300"
                    onClick={() => handleCaseClick(caseItem)}
                  >
                    <CardContent className="p-6">
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img 
                          src={caseItem.image} 
                          alt={caseItem.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-center text-foreground">{caseItem.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Settings Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setSettingsOpen(true)}
              className="w-full md:w-auto"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Animal Detail Modal */}
      <Dialog open={animalModalOpen} onOpenChange={setAnimalModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedAnimal?.name} - Health Details</DialogTitle>
          </DialogHeader>
          
          {selectedAnimal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img 
                  src={selectedAnimal.image} 
                  alt={selectedAnimal.name}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold text-center">{selectedAnimal.name}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Recent Health Stats</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-destructive" />
                      <span>Heart Rate: {selectedAnimal.healthStats.heartRate} BPM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span>Breathing: {selectedAnimal.healthStats.breathing}/min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-warning" />
                      <span>Temperature: {selectedAnimal.healthStats.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-accent" />
                      <span>Activity: {selectedAnimal.healthStats.activity}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Medical History</h4>
                  <div className="space-y-4">
                    {selectedAnimal.medicalHistory.map((record) => (
                      <div key={record.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start space-x-3 mb-3">
                          <img 
                            src={record.diseaseImage} 
                            alt={record.disease}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-destructive">{record.disease}</h5>
                            <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                            <p className="text-sm font-medium">{record.vetHospital}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Recovery Progress</span>
                            <span>{record.recoveryPercentage}%</span>
                          </div>
                          <div className="w-full bg-secondary-soft rounded-full h-2">
                            <div 
                              className="bg-success h-2 rounded-full transition-all duration-300"
                              style={{ width: `${record.recoveryPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recent Case Modal */}
      <Dialog open={caseModalOpen} onOpenChange={setCaseModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCase?.name} - Current Case</DialogTitle>
          </DialogHeader>
          
          {selectedCase && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.name}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold text-center">{selectedCase.name}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Current Health Stats</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-destructive" />
                      <span>Heart Rate: {selectedCase.healthStats.heartRate} BPM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span>Breathing: {selectedCase.healthStats.breathing}/min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-warning" />
                      <span>Temperature: {selectedCase.healthStats.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-accent" />
                      <span>Activity: {selectedCase.healthStats.activity}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Current Condition</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Disease:</span>
                      <p className="font-medium text-destructive">{selectedCase.currentDisease}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Diagnosis:</span>
                      <p className="text-sm">{selectedCase.diagnosis}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Medical Care:</span>
                      <p className="text-sm">{selectedCase.medicalCare}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Recovery Progress</span>
                    <span>{selectedCase.recoveryPercentage}%</span>
                  </div>
                  <div className="w-full bg-secondary-soft rounded-full h-3">
                    <div 
                      className="bg-warning h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedCase.recoveryPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-medium transition-shadow">
              <CardContent className="p-6 text-center">
                <Palette className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Change Theme</h3>
                <p className="text-sm text-muted-foreground">Customize your app appearance</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-shadow">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-8 h-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Current Plan</h3>
                <p className="text-sm text-muted-foreground">Premium - Valid till Dec 2024</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-shadow">
              <CardContent className="p-6 text-center">
                <Monitor className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Future Plans</h3>
                <p className="text-sm text-muted-foreground">Explore upcoming features</p>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;