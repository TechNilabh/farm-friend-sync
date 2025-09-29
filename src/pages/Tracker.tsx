import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Zap, 
  Heart, 
  Phone, 
  MessageCircle, 
  MapPin,
  Activity,
  Droplets,
  Thermometer,
  Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import doctor1 from '@/assets/doctor-1.jpg';
import doctor2 from '@/assets/doctor-2.jpg';
import doctor3 from '@/assets/doctor-3.jpg';

interface Animal {
  id: string;
  name: string;
  image: string;
  age: number;
  priority: 'High' | 'Medium' | 'Low';
  healthScore: number;
  parameters: {
    heartrate: number;
    hydration: number;
    temperature: number;
    healthScore: number;
    activity: number;
    breathing: number;
    hunger: number;
  };
  location: { lat: number; lng: number };
}

interface Doctor {
  id: string;
  name: string;
  image: string;
  specialization: string;
  location: string;
  rating: number;
}

interface Medicine {
  id: string;
  name: string;
  image: string;
  dosage: string;
  price: string;
}

const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Bella',
    image: '/api/placeholder/200/150',
    age: 3,
    priority: 'High',
    healthScore: 8.2,
    parameters: {
      heartrate: 72,
      hydration: 85,
      temperature: 38.5,
      healthScore: 8.2,
      activity: 78,
      breathing: 16,
      hunger: 92,
    },
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '2',
    name: 'Max',
    image: '/api/placeholder/200/150',
    age: 5,
    priority: 'Medium',
    healthScore: 7.8,
    parameters: {
      heartrate: 68,
      hydration: 78,
      temperature: 38.2,
      healthScore: 7.8,
      activity: 82,
      breathing: 18,
      hunger: 88,
    },
    location: { lat: 28.7041, lng: 77.1025 }
  },
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    image: doctor1,
    specialization: 'Large Animal Medicine',
    location: 'New Delhi, 2.5 km',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    image: doctor2,
    specialization: 'Small Animal Surgery',
    location: 'Gurgaon, 5.2 km',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    image: doctor3,
    specialization: 'Emergency Care',
    location: 'Noida, 7.8 km',
    rating: 4.7,
  },
];

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Vetmedin',
    image: '/api/placeholder/100/100',
    dosage: '2.5mg twice daily',
    price: '₹850',
  },
  {
    id: '2',
    name: 'Metacam',
    image: '/api/placeholder/100/100',
    dosage: '0.1mg/kg once daily',
    price: '₹620',
  },
  {
    id: '3',
    name: 'Baytril',
    image: '/api/placeholder/100/100',
    dosage: '5mg/kg twice daily',
    price: '₹1,250',
  },
];

interface TrackerProps {
  userProfileImage?: string;
}

const Tracker: React.FC<TrackerProps> = ({ userProfileImage }) => {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [highConnectivity, setHighConnectivity] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAlert = (type: 'soft' | 'medium' | 'loud' | 'mixed') => {
    // Create different alert sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequencies = {
      soft: [800, 1000],
      medium: [1200, 1400],
      loud: [1800, 2000],
      mixed: [800, 1200, 1800]
    };
    
    const durations = {
      soft: 0.3,
      medium: 0.5,
      loud: 1.0,
      mixed: 2.0
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type][0], audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + durations[type]);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + durations[type]);
  };

  const simulateAlert = (alertType: 1 | 2 | 3 | 4) => {
    const updatedAnimals = [...animals];
    
    switch (alertType) {
      case 1: // Blue - No disease
        playAlert('soft');
        updatedAnimals[0].healthScore = 7.2;
        updatedAnimals[0].parameters.hydration = 75;
        break;
        
      case 2: // Green - Low priority
        playAlert('medium');
        updatedAnimals[0].healthScore = 6.5;
        updatedAnimals[0].parameters.hydration = 65;
        updatedAnimals[0].parameters.activity = 60;
        if (updatedAnimals[1]) {
          updatedAnimals[1].healthScore = 6.8;
          updatedAnimals[1].parameters.heartrate = 85;
          updatedAnimals[1].parameters.breathing = 22;
        }
        break;
        
      case 3: // Yellow - Mid priority
        playAlert('loud');
        updatedAnimals[0].healthScore = 5.2;
        updatedAnimals[0].parameters.heartrate = 45;
        updatedAnimals[0].parameters.temperature = 40.2;
        break;
        
      case 4: // Red - High priority (mixed alerts)
        playAlert('mixed');
        updatedAnimals.forEach((animal, index) => {
          if (index === 0) {
            animal.healthScore = 3.8;
            animal.parameters.heartrate = 35;
            animal.parameters.hydration = 45;
          } else {
            animal.healthScore = 5.5;
            animal.parameters.breathing = 28;
          }
        });
        break;
    }
    
    setAnimals(updatedAnimals);
  };

  const getHealthStatus = (score: number) => {
    if (score >= 7.0) return { status: 'Healthy', color: 'bg-success', textColor: 'text-success' };
    if (score >= 4.5) return { status: 'Mid level issue', color: 'bg-warning', textColor: 'text-warning' };
    return { status: 'Emergency', color: 'bg-destructive', textColor: 'text-destructive' };
  };

  const getDiagnosis = (animal: Animal) => {
    const { healthScore, parameters } = animal;
    
    if (healthScore >= 7.0) {
      if (parameters.hydration < 80) {
        return {
          issue: 'Mild dehydration',
          steps: 'Increase water intake, monitor hydration levels',
          severity: 'low'
        };
      }
      return {
        issue: 'No significant issues',
        steps: 'Continue regular monitoring',
        severity: 'none'
      };
    } else if (healthScore >= 4.5) {
      if (parameters.heartrate > 80) {
        return {
          issue: 'Elevated heart rate - possible stress',
          steps: 'Reduce stress factors, provide calm environment',
          severity: 'medium'
        };
      }
      return {
        issue: 'General health concerns',
        steps: 'Schedule veterinary checkup',
        severity: 'medium'
      };
    } else {
      if (parameters.heartrate < 50) {
        return {
          issue: 'Severe bradycardia - heart emergency',
          steps: 'IMMEDIATE veterinary attention required',
          severity: 'high'
        };
      }
      return {
        issue: 'Critical health condition',
        steps: 'Emergency veterinary care needed',
        severity: 'high'
      };
    }
  };

  const handleContact = (method: 'whatsapp' | 'phone', doctor: Doctor) => {
    if (method === 'whatsapp') {
      window.open(`https://wa.me/+919876543210?text=Hello Dr. ${doctor.name}, I need assistance with my animal's health.`);
    } else {
      window.open(`tel:+919876543210`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userProfileImage={userProfileImage} />
      
      <main className="pt-20">
        {/* Section 1: Controls */}
        <section className="py-8 bg-secondary-soft border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* Simulator Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateAlert(1)}
                  className="bg-sky text-sky-foreground border-sky hover:bg-sky/90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <Heart className="w-4 h-4 mr-2" />
                  No Disease
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateAlert(2)}
                  className="bg-success text-success-foreground border-success hover:bg-success/90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <Heart className="w-4 h-4 mr-2" />
                  Low Priority
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateAlert(3)}
                  className="bg-warning text-warning-foreground border-warning hover:bg-warning/90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <Heart className="w-4 h-4 mr-2" />
                  Mid Priority
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateAlert(4)}
                  className="bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <Heart className="w-4 h-4 mr-2" />
                  High Alert
                </Button>
              </div>

              {/* Connectivity Switch */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">
                  {highConnectivity ? 'High connectivity mode' : 'Low connectivity mode'}
                </span>
                <Switch
                  checked={highConnectivity}
                  onCheckedChange={setHighConnectivity}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Animal Cards */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {animals.map((animal) => {
                const health = getHealthStatus(animal.healthScore);
                
                return (
                  <motion.div
                    key={animal.id}
                    className={`relative ${
                      animal.healthScore < 7.0 
                        ? animal.healthScore >= 4.5 
                          ? 'animate-pulse ring-4 ring-warning/50' 
                          : 'animate-pulse ring-4 ring-destructive/50'
                        : animal.healthScore === 7.2 
                          ? 'animate-pulse ring-4 ring-success/50' 
                          : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={animal.image} 
                          alt={animal.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-foreground">{animal.name}</h3>
                        
                        {/* Health Parameters */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-destructive animate-pulse" />
                            <span className="font-mono">{animal.parameters.heartrate} BPM</span>
                            <div className="w-8 h-2 bg-muted rounded">
                              <div className="h-full bg-destructive rounded animate-pulse" style={{ width: '60%' }} />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-sky" />
                            <span className="font-mono">{animal.parameters.hydration}%</span>
                            <div className="w-8 h-2 bg-muted rounded">
                              <div 
                                className="h-full bg-sky rounded transition-all duration-1000" 
                                style={{ width: `${animal.parameters.hydration}%` }} 
                              />
                            </div>
                          </div>
                          {highConnectivity && (
                            <>
                              <div className="flex items-center space-x-2">
                                <Thermometer className="w-4 h-4 text-warning" />
                                <span className="font-mono">{animal.parameters.temperature}°C</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-primary" />
                                <span className="font-mono">{animal.parameters.activity}%</span>
                                <div className="w-8 h-2 bg-muted rounded">
                                  <div 
                                    className="h-full bg-primary rounded" 
                                    style={{ width: `${animal.parameters.activity}%` }} 
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* Health Score */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full ${health.color} ${health.textColor} border-current font-bold shadow-md`}
                          onClick={() => {
                            setSelectedAnimal(animal);
                            setReportOpen(true);
                          }}
                        >
                          Health Score: {animal.healthScore.toFixed(1)} - {health.status}
                        </Button>
                        
                        {/* Live Location Map */}
                        <div className="mt-4 space-y-3">
                          <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                            <div className="text-center">
                              <MapPin className="w-6 h-6 text-primary mx-auto mb-1" />
                              <p className="text-sm font-medium">Live Location</p>
                              <p className="text-xs text-muted-foreground">
                                {animal.location.lat.toFixed(4)}, {animal.location.lng.toFixed(4)}
                              </p>
                            </div>
                          </div>
                          
                          {/* Animal Status Zone */}
                          <div className={`p-3 rounded-lg text-center text-sm font-medium ${
                            animal.healthScore >= 7.0 
                              ? 'bg-success/20 text-success border border-success/30'
                              : animal.healthScore >= 4.5
                                ? 'bg-warning/20 text-warning border border-warning/30'
                                : 'bg-destructive/20 text-destructive border border-destructive/30'
                          }`}>
                            {animal.healthScore >= 7.0 
                              ? 'Animal in Safe Zone'
                              : animal.healthScore >= 4.5
                                ? 'Animal in Threshold Zone'
                                : 'Animal Lost - Too Far Away'
                            }
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Animal Report Modal */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Health Report - {selectedAnimal?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedAnimal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img 
                  src={selectedAnimal.image} 
                  alt={selectedAnimal.name}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Possible Issues & Actions</h3>
                  {(() => {
                    const diagnosis = getDiagnosis(selectedAnimal);
                    return (
                      <div className="space-y-2">
                        <p className={`font-medium ${
                          diagnosis.severity === 'high' ? 'text-destructive' :
                          diagnosis.severity === 'medium' ? 'text-warning' :
                          'text-success'
                        }`}>
                          {diagnosis.issue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {diagnosis.steps}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Animal Details</h3>
                  <p><strong>Name:</strong> {selectedAnimal.name}</p>
                  <p><strong>Age:</strong> {selectedAnimal.age} years</p>
                  <p><strong>Priority:</strong> {selectedAnimal.priority}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Health Parameters</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Heart Rate: {selectedAnimal.parameters.heartrate} BPM</p>
                    <p>Hydration: {selectedAnimal.parameters.hydration}%</p>
                    <p>Temperature: {selectedAnimal.parameters.temperature}°C</p>
                    <p>Activity: {selectedAnimal.parameters.activity}%</p>
                    <p>Breathing: {selectedAnimal.parameters.breathing}/min</p>
                    <p>Hunger: {selectedAnimal.parameters.hunger}%</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <div className="bg-muted rounded-lg p-4 flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Lat: {selectedAnimal.location.lat}, Lng: {selectedAnimal.location.lng}</span>
                  </div>
                </div>
                
                {/* Doctors and Treatment */}
                <div>
                  <h3 className="font-semibold mb-2">Nearest Veterinarians</h3>
                  <div className="space-y-2">
                    {mockDoctors.slice(0, 2).map((doctor) => (
                      <div key={doctor.id} className="border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/50" onClick={() => {
                        setSelectedDoctor(doctor);
                        setDoctorOpen(true);
                      }}>
                        <div className="flex items-center space-x-3">
                          <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-sm">{doctor.name}</p>
                            <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recommended Medicines */}
                <div>
                  <h3 className="font-semibold mb-2">Recommended Medicines</h3>
                  <div className="space-y-2">
                    {mockMedicines.slice(0, 2).map((medicine) => (
                      <div key={medicine.id} className="border border-border rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <img src={medicine.image} alt={medicine.name} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <p className="font-medium text-sm">{medicine.name}</p>
                            <p className="text-xs text-muted-foreground">{medicine.dosage}</p>
                            <p className="text-sm font-bold text-primary">{medicine.price}</p>
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

      {/* Doctor Contact Modal */}
      <Dialog open={doctorOpen} onOpenChange={setDoctorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {selectedDoctor?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedDoctor && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{selectedDoctor.name}</h3>
                  <p className="text-muted-foreground">{selectedDoctor.specialization}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span>{selectedDoctor.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedDoctor.location}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="success" 
                  className="flex-1"
                  onClick={() => handleContact('whatsapp', selectedDoctor)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleContact('phone', selectedDoctor)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tracker;