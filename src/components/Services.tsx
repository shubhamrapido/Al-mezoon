'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scissors, Wrench, Truck, CheckCircle, Factory } from 'lucide-react'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [windowWidth, setWindowWidth] = useState(0)

  // Helper function to get responsive image URL based on screen width
  const getResponsiveImageUrl = (baseUrl: string): { mobile: string; tablet: string; desktop: string } => {
    // Remove any existing transformation parameters
    const urlParts = baseUrl.split('/upload/');
    const baseUrlWithoutParams = urlParts[0] + '/upload/' + urlParts[1].split('/').slice(1).join('/');
    
    return {
      mobile: baseUrlWithoutParams.replace('/upload/', '/upload/f_auto,q_auto,w_640,c_fill/'),
      tablet: baseUrlWithoutParams.replace('/upload/', '/upload/f_auto,q_auto,w_1280,c_fill/'),
      desktop: baseUrlWithoutParams.replace('/upload/', '/upload/f_auto,q_auto,w_1600,c_fill/')
    };
  };

  // Update window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Define service type
  type Service = {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    image: string;
    responsiveImages: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };

  // Get appropriate image URL based on window width
  const getResponsiveImage = (service: Service): string => {
    if (windowWidth === 0) return service.image; // Default for SSR
    if (windowWidth < 768) return service.responsiveImages.mobile;
    if (windowWidth < 1280) return service.responsiveImages.tablet;
    return service.responsiveImages.desktop;
  };

  const services = [
    {
      icon: Scissors,
      title: "Fabrication",
      description: "Custom cutting and shaping of stones with high-precision finishes, including kitchen countertops, vanity tops, and wall cladding.",
      features: ["Custom Cutting", "Precision Finish", "Quality Control"],
      image: "https://res.cloudinary.com/dmfrfsnro/image/upload/v1750925956/AVI_4406-min_hrhyjx.jpg",
      responsiveImages: getResponsiveImageUrl("https://res.cloudinary.com/dmfrfsnro/image/upload/v1750925956/AVI_4406-min_hrhyjx.jpg")
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "On-site expert installation of marble, granite, quartz, and porcelain with full project management for perfect finish.",
      features: ["Expert Team", "Project Management", "Perfect Finish"],
      image: "https://res.cloudinary.com/dmfrfsnro/image/upload/v1750926112/AVI_4157-min_qmxp4s.jpg",
      responsiveImages: getResponsiveImageUrl("https://res.cloudinary.com/dmfrfsnro/image/upload/v1750926112/AVI_4157-min_qmxp4s.jpg")
    },
    {
      icon: Truck,
      title: "Material Supply",
      description: "Premium stones sourced from top global quarries, including marble, granite, quartz, and porcelain in bulk quantities.",
      features: ["Global Sourcing", "Premium Quality", "Bulk Supply"],
      image: "https://res.cloudinary.com/dmfrfsnro/image/upload/v1750925707/AVI_4413_copy-min_hafwmp.jpg",
      responsiveImages: getResponsiveImageUrl("https://res.cloudinary.com/dmfrfsnro/image/upload/v1750925707/AVI_4413_copy-min_hafwmp.jpg")
    }
  ]

  const stats = [
    { icon: Factory, number: "1800", label: "SqM Facility" },
    { icon: CheckCircle, number: "25+", label: "Years Expertise" }
  ]

  return (
    <section 
      id="services" 
      className="py-20 relative"
      style={{
        backgroundImage: 'url(https://wallpapers.com/images/hd/white-texture-pictures-9c27sac284jgqqwk.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4">
            CORE SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What We Do
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From fabrication to installation, we provide comprehensive stone solutions with precision craftsmanship and exceptional quality.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              {/* Service Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={getResponsiveImage(service)}
                  alt={service.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-3">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>

              {/* Service Content */}
              <div className="space-y-4">
                <p className="text-gray-600">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center space-x-1 group">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Service Excellence by Numbers
            </h3>
            <p className="text-gray-600">
              Our commitment to quality and precision drives everything we do
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Our Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Consultation', 'Design', 'Fabrication', 'Installation'].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step}</h4>
                <p className="text-sm text-gray-600">
                  {index === 0 ? "Free consultation to understand your needs" :
                   index === 1 ? "Custom design tailored to your space" :
                   index === 2 ? "Precision fabrication in our facility" :
                   "Professional installation by experts"}
                </p>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-amber-200 transform translate-x-6" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 