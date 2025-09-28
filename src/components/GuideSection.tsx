import React from 'react';
import { motion } from 'framer-motion';
import biosyncCollar from '@/assets/biosync-collar.jpg';

const GuideSection = () => {
  const steps = [
    {
      number: "01",
      title: "Attach the Collar",
      description: "Wrap collar around neck of animal and press the button. Wait till light turns green.",
      icon: "🔗"
    },
    {
      number: "02", 
      title: "Open Interface",
      description: "Open interface and click on get started, then sync device with collar.",
      icon: "📱"
    },
    {
      number: "03",
      title: "Upload Images", 
      description: "Upload images of all animals and you are good to go.",
      icon: "📷"
    },
    {
      number: "04",
      title: "Monitor Health",
      description: "Track your animals' health in real-time with AI-powered insights.",
      icon: "📊"
    }
  ];

  return (
    <section id="guide" className="py-20 bg-background">
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
            Guide to use <span className="text-primary">BioSync</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to get started with monitoring your animals' health
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border group hover:border-primary/30">
                
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-primary bg-primary-soft px-3 py-1 rounded-lg">
                    {step.number}
                  </span>
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-gradient-to-r from-primary to-accent opacity-30" />
                )}

                {/* Hover Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Aid */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-card rounded-2xl p-8 shadow-medium">
            <img 
              src={biosyncCollar}
              alt="BioSync 360 Collar Device"
              className="w-32 h-24 object-cover rounded-lg mx-auto mb-4"
            />
            <p className="text-sm text-muted-foreground">
              BioSync 360 Smart Collar - Your animal's health guardian
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GuideSection;