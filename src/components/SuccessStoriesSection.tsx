import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import successStory1 from '@/assets/success-story-1.jpg';
import successStory2 from '@/assets/success-story-2.jpg';
import successStory3 from '@/assets/success-story-3.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SuccessStoriesSection = () => {
  const stories = [
    {
      id: 1,
      image: successStory1,
      name: "Sarah Johnson",
      location: "Green Valley Farm",
      story: "BioSync 360 helped us detect early signs of illness in our dairy cows. The AI alerts saved us thousands in veterinary costs and prevented the spread of disease across our herd.",
      rating: 5,
      animals: "50+ Cattle"
    },
    {
      id: 2,
      image: successStory2,
      name: "Dr. Michael Chen",
      location: "Countryside Veterinary Clinic",
      story: "As a veterinarian, I've seen the remarkable impact of BioSync 360. The real-time monitoring has enabled us to provide proactive care, resulting in healthier animals and happier owners.",
      rating: 5,
      animals: "200+ Patients"
    },
    {
      id: 3,
      image: successStory3,
      name: "Emily Rodriguez",
      location: "Happy Tails Rescue",
      story: "This technology transformed our rescue operations. We can now monitor the health of over 100 rescued animals simultaneously, ensuring each one gets the care they deserve.",
      rating: 5,
      animals: "100+ Rescues"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-accent fill-current' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <section id="success-stories" className="py-20 bg-sky-soft">
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
            Success Stories from Our <span className="text-sky">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from farmers, veterinarians, and animal lovers who trust BioSync 360
          </p>
        </motion.div>

        {/* Stories Slider */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-sky',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-sky',
            }}
            navigation={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <motion.div 
                  className="bg-card rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 overflow-hidden group h-full"
                  whileHover={{ y: -5 }}
                >
                  {/* Story Image */}
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={story.image}
                      alt={`Success story from ${story.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky/20 to-transparent" />
                    
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Quote className="w-5 h-5 text-sky" />
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {renderStars(story.rating)}
                    </div>

                    {/* Story Text */}
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{story.story}"
                    </p>

                    {/* Author Info */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold text-card-foreground">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-2 h-2 bg-sky rounded-full"></div>
                        <span className="text-sm text-sky font-medium">{story.animals}</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-sky/10 px-6 py-3 rounded-full">
            <span className="text-sky-foreground font-medium">Join thousands of satisfied users</span>
            <motion.div 
              className="w-2 h-2 bg-sky rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SuccessStoriesSection;