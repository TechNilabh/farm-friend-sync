import React from 'react';
import { motion } from 'framer-motion';
import featureTracking from '@/assets/feature-tracking.jpg';
import featureAiAlerts from '@/assets/feature-ai-alerts.jpg';
import featureDiagnosis from '@/assets/feature-diagnosis.jpg';
import featureSpecies from '@/assets/feature-species.jpg';

const FeaturesSection = () => {
  const features = [
    {
      title: "Live tracking animal health",
      image: featureTracking,
      delay: 0.1
    },
    {
      title: "Smart AI alerts for health decline",
      image: featureAiAlerts,
      delay: 0.2
    },
    {
      title: "Live diagnosis system and emergency service",
      image: featureDiagnosis,
      delay: 0.3
    },
    {
      title: "Supports over 200+ species",
      image: featureSpecies,
      delay: 0.4
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary-soft">
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
            With fast tech, why risk your 
            <span className="text-primary"> friends' care?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced veterinary technology that ensures your animals receive the best care possible
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 overflow-hidden group"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <motion.div 
                  className="w-0 h-1 bg-gradient-hero group-hover:w-full transition-all duration-500"
                  layout
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div 
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-6 py-3 rounded-full">
            <span className="text-accent-foreground font-medium">And more features</span>
            <motion.div 
              className="w-2 h-2 bg-accent rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;