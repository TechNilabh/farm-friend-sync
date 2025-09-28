import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare, Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        rating: 0
      });
    }, 2000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.button
        key={i}
        type="button"
        onClick={() => handleRatingClick(i + 1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="focus:outline-none"
      >
        <Star 
          className={`w-6 h-6 transition-colors duration-200 ${
            i < formData.rating ? 'text-accent fill-current' : 'text-muted-foreground hover:text-accent'
          }`}
        />
      </motion.button>
    ));
  };

  return (
    <section id="contact" className="py-20 bg-background">
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
            Need Help or Have <span className="text-primary">Feedback?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Share your experience or reach out with any questions about BioSync 360
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-medium border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-card-foreground">Send us a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <Label>Rate your experience (optional)</Label>
                    <div className="flex items-center space-x-1 mt-2">
                      {renderStars()}
                      {formData.rating > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 resize-none"
                      placeholder="Tell us about your experience, ask questions, or report any issues..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Quick Actions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            
            {/* Contact Information */}
            <Card className="shadow-medium border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Mail className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-bold text-card-foreground">Get in Touch</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Email Support</h4>
                    <p className="text-muted-foreground">support@biosync360.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Phone Support</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Business Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-muted-foreground">Emergency support: 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="shadow-medium border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6">Quick Help</h3>
                
                <div className="space-y-3">
                  <motion.div 
                    className="p-4 bg-primary-soft rounded-lg border border-primary/20 hover:border-primary/40 transition-colors duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium text-primary mb-1">Device Setup Guide</h4>
                    <p className="text-sm text-muted-foreground">Step-by-step instructions for collar setup</p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 bg-accent-soft rounded-lg border border-accent/20 hover:border-accent/40 transition-colors duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium text-accent mb-1">Troubleshooting</h4>
                    <p className="text-sm text-muted-foreground">Common issues and solutions</p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 bg-earth-soft rounded-lg border border-earth/20 hover:border-earth/40 transition-colors duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium text-earth mb-1">Emergency Support</h4>
                    <p className="text-sm text-muted-foreground">24/7 urgent care assistance</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;