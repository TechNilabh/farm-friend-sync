import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bluetooth, Upload, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SetupSection = () => {
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [animalName, setAnimalName] = useState('');
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const { toast } = useToast();

  const handleDeviceSync = () => {
    setSyncDialogOpen(true);
  };

  const handleConnectDevice = () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Device Connected",
        description: "BioSync 360 collar successfully paired!",
      });
      
      setTimeout(() => {
        setSyncDialogOpen(false);
        setIsConnected(false);
      }, 2000);
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAnimal = () => {
    if (selectedImage && animalName) {
      setIsUploadComplete(true);
      toast({
        title: "Animal Added",
        description: `${animalName} has been successfully added to your tracking list!`,
      });
      
      setTimeout(() => {
        setUploadDialogOpen(false);
        setSelectedImage(null);
        setAnimalName('');
        setIsUploadComplete(false);
      }, 2000);
    }
  };

  return (
    <section id="setup" className="py-20 bg-earth-soft">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Started with <span className="text-earth">BioSync 360</span>
          </h2>
        </motion.div>

        {/* Setup Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Sync Device */}
          <motion.div
            className="relative group"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-border group-hover:border-earth/30">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-earth/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-earth/20 transition-colors duration-300">
                  <Bluetooth className="w-8 h-8 text-earth" />
                </div>
                
                <h3 className="text-2xl font-bold text-card-foreground group-hover:text-earth transition-colors duration-300">
                  Sync Device
                </h3>
                
                <p className="text-muted-foreground">
                  Connect your BioSync 360 collar to start monitoring your animal's health in real-time.
                </p>
                
                <Button 
                  variant="earth" 
                  size="lg"
                  onClick={handleDeviceSync}
                  className="w-full"
                >
                  <Bluetooth className="w-5 h-5 mr-2" />
                  Connect Device
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Upload Subjects */}
          <motion.div
            className="relative group"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-border group-hover:border-accent/30">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300">
                  Upload Subjects
                </h3>
                
                <p className="text-muted-foreground">
                  Add photos and details of your animals to create their health monitoring profiles.
                </p>
                
                <Button 
                  variant="accent" 
                  size="lg"
                  onClick={() => setUploadDialogOpen(true)}
                  className="w-full"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Add Animals
                </Button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Device Sync Dialog */}
        <Dialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Bluetooth className="w-5 h-5 text-earth" />
                <span>Sync BioSync Device</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Looking for nearby BioSync devices...
                </p>
                
                <motion.div 
                  className="bg-card border border-border rounded-lg p-4 hover:border-earth/50 cursor-pointer transition-colors duration-300"
                  whileHover={{ scale: isConnecting ? 1 : 1.02 }}
                  onClick={isConnecting ? undefined : handleConnectDevice}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                      <span className="font-medium">BioSync 360</span>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {isConnecting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Loader2 className="w-5 h-5 animate-spin text-earth" />
                        </motion.div>
                      ) : isConnected ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Check className="w-5 h-5 text-success" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="bluetooth"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Bluetooth className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {isConnecting && (
                  <motion.p 
                    className="text-sm text-muted-foreground mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Connecting to device...
                  </motion.p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-accent" />
                <span>Add Animal</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {!selectedImage ? (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Upload image of every animal to track
                  </p>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-accent/50 transition-colors duration-300">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <Label htmlFor="animal-image" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>Choose Image</span>
                      </Button>
                    </Label>
                    <Input 
                      id="animal-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <img 
                      src={selectedImage}
                      alt="Uploaded animal"
                      className="w-48 h-36 object-cover rounded-lg mx-auto border border-border"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="animal-name">Name of animal</Label>
                      <Input 
                        id="animal-name"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        placeholder="Enter animal name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="animal-species">Species of animal</Label>
                      <Input 
                        id="animal-species"
                        value="Lakhimi"
                        disabled
                        className="mt-1 bg-muted"
                      />
                    </div>
                    
                    <Button 
                      variant="success" 
                      size="lg"
                      onClick={handleSaveAnimal}
                      disabled={!animalName || isUploadComplete}
                      className="w-full"
                    >
                      {isUploadComplete ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Saved Successfully
                        </>
                      ) : (
                        <>Save</>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default SetupSection;