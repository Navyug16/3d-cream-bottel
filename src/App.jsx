import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { Scene } from './components/Scene';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef();
  const [loading, setLoading] = useState(true);

  // Fake Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Fade up glass panels
      const panels = gsap.utils.toArray('.glass-panel');
      panels.forEach((panel) => {
        gsap.fromTo(panel, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Refresh ScrollTrigger to ensure correct layout calculations
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

    }, appRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          >
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 border-4 border-t-[#C9A227] border-[#222] rounded-full animate-spin mx-auto mb-4"
              />
              <h2 className="font-serif text-2xl text-[#EAEAEA] tracking-widest uppercase">SOLÉA</h2>
              <p className="text-[#C9A227] tracking-widest text-sm mt-2 uppercase">Daily Sun Protection, Elevated.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
      
      {/* Announcement Bar */}
      <div className="w-full bg-[#111111] border-b border-white/5 text-center py-2 text-sm text-[#C9A227] uppercase tracking-wider fixed top-0 z-50">
        Free Shipping on All Orders Above ₹999
      </div>
      
      <div className="app-container pt-10" ref={appRef}>
        <Scene />
        <div className="ambient-glow" />

        <main className="scroll-content">
          {/* SECTION 1 — HERO */}
          <section className="section hero min-h-screen">
            <div className="content glass-panel max-w-2xl">
              <motion.h1 
                className="text-5xl md:text-7xl mb-4 leading-tight font-serif"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.2 }}
              >
                The Future of <br/>
                <span className="text-gradient">Daily Sun Care</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-[#C9A227] mb-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.4 }}
              >
                A lightweight SPF 50+ sunscreen designed to protect, hydrate, and glow with every application.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                Created for modern lifestyles, SOLÉA combines advanced UV protection with a breathable skin-first formula that feels invisible while delivering all-day comfort.
              </motion.p>
              
              <motion.div 
                className="flex gap-4 flex-wrap mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                <button className="cta-button">Shop Now</button>
                <button className="cta-button secondary">Discover More</button>
              </motion.div>
              
              <motion.div 
                className="flex gap-6 text-xs text-gray-400 uppercase tracking-widest flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.1 }}
              >
                <span>SPF 50+ Protection</span>
                <span>•</span>
                <span>Lightweight Formula</span>
                <span>•</span>
                <span>Water Resistant</span>
                <span>•</span>
                <span>Dermatologically Tested</span>
              </motion.div>

              <motion.div 
                className="mt-12 text-sm uppercase tracking-widest text-gray-500 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
              >
                <span>Scroll to explore</span>
                <span className="animate-bounce">↓</span>
              </motion.div>
            </div>
          </section>

          {/* SECTION 2 — PRODUCT STORY */}
          <section className="section product-story">
            <div className="content glass-panel max-w-xl text-right ml-auto">
              <h2 className="text-4xl md:text-5xl mb-6 text-gradient font-serif">Protection That Feels Effortless</h2>
              <p className="text-xl text-[#C9A227] mb-6">
                Sun protection should feel as luxurious as skincare.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                SOLÉA is crafted to deliver powerful broad-spectrum protection without the heavy texture of traditional sunscreens. The silky formula melts seamlessly into the skin, leaving behind a natural radiant finish with no white cast.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Whether under the morning sun or throughout long outdoor days, SOLÉA keeps your skin protected, hydrated, and refreshed.
              </p>
            </div>
          </section>

          {/* SECTION 3 — WHY SOLÉA */}
          <section className="section features min-h-screen py-20">
            <h2 className="text-4xl md:text-5xl mb-12 text-center text-gradient font-serif">Designed for Everyday Skin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Invisible Finish</h3>
                <p className="text-gray-400">Blends naturally into all skin tones with zero residue.</p>
              </div>
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Hydration Boost</h3>
                <p className="text-gray-400">Infused with moisture-locking ingredients to maintain soft and healthy-looking skin.</p>
              </div>
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Lightweight Feel</h3>
                <p className="text-gray-400">Breathable texture designed for daily wear under makeup or alone.</p>
              </div>
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Advanced UV Defense</h3>
                <p className="text-gray-400">Broad-spectrum SPF 50+ protection against UVA and UVB exposure.</p>
              </div>
            </div>
          </section>

          {/* SECTION 4 — INGREDIENT HIGHLIGHTS */}
          <section className="section case-study">
            <div className="content glass-panel max-w-xl">
              <h2 className="text-4xl md:text-5xl mb-10 text-gradient font-serif">Powered by Skin-Loving Ingredients</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl text-[#C9A227] font-serif mb-2">Hyaluronic Acid</h3>
                  <p className="text-gray-400">Helps maintain deep hydration for smoother and healthier skin.</p>
                </div>
                <div>
                  <h3 className="text-2xl text-[#C9A227] font-serif mb-2">Vitamin E</h3>
                  <p className="text-gray-400">Provides antioxidant support to protect against environmental stress.</p>
                </div>
                <div>
                  <h3 className="text-2xl text-[#C9A227] font-serif mb-2">Niacinamide</h3>
                  <p className="text-gray-400">Helps improve skin texture and supports a balanced complexion.</p>
                </div>
                <div>
                  <h3 className="text-2xl text-[#C9A227] font-serif mb-2">Aloe Vera Extract</h3>
                  <p className="text-gray-400">Soothes and refreshes skin exposed to heat and sunlight.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5 — MARQUEE (MICROCOPY) */}
          <div className="marquee-container my-10">
            <div className="marquee-content">
              <span className="tech-pill">Invisible Protection</span>
              <span className="tech-pill">Everyday Radiance</span>
              <span className="tech-pill">SPF Meets Skincare</span>
              <span className="tech-pill">Lightweight Luxury</span>
              <span className="tech-pill">Daily Defense</span>
              {/* Duplicate for infinite loop */}
              <span className="tech-pill">Invisible Protection</span>
              <span className="tech-pill">Everyday Radiance</span>
              <span className="tech-pill">SPF Meets Skincare</span>
              <span className="tech-pill">Lightweight Luxury</span>
              <span className="tech-pill">Daily Defense</span>
            </div>
          </div>

          {/* SECTION 6 — EXPERIENCE */}
          <section className="section product-story">
            <div className="content glass-panel max-w-xl text-right ml-auto">
              <h2 className="text-4xl md:text-5xl mb-6 text-gradient font-serif">Made for Every Moment Under the Sun</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                From morning commutes to beachside afternoons, SOLÉA is designed to move effortlessly with your lifestyle.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                The lightweight formula absorbs quickly, allowing your skin to breathe while maintaining long-lasting comfort and protection throughout the day.
              </p>
              <div className="text-[#C9A227] text-xl font-serif mt-8 space-y-2">
                <p>No heaviness.</p>
                <p>No stickiness.</p>
                <p>Only smooth, radiant protection.</p>
              </div>
            </div>
          </section>

          {/* SECTION 7 — HOW TO USE */}
          <section className="section case-study">
            <div className="content glass-panel max-w-xl">
              <h2 className="text-4xl md:text-5xl mb-8 text-gradient font-serif">Simple Daily Protection</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="text-[#C9A227] text-2xl font-serif">01</div>
                  <div>
                    <h3 className="text-xl text-white mb-2 font-medium">Prep & Apply</h3>
                    <p className="text-gray-400">Apply generously to clean skin 15 minutes before sun exposure.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#C9A227] text-2xl font-serif">02</div>
                  <div>
                    <h3 className="text-xl text-white mb-2 font-medium">Blend</h3>
                    <p className="text-gray-400">Blend evenly across face and neck using gentle upward motions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#C9A227] text-2xl font-serif">03</div>
                  <div>
                    <h3 className="text-xl text-white mb-2 font-medium">Maintain</h3>
                    <p className="text-gray-400">Reapply every 2 hours for continuous protection, especially after swimming or sweating.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8 — CUSTOMER REVIEWS */}
          <section className="section features min-h-[70vh]">
            <h2 className="text-4xl md:text-5xl mb-12 text-center text-gradient font-serif">Loved by Everyday Skin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
              <div className="glass-panel p-8">
                <div className="text-[#C9A227] text-2xl mb-4">★★★★★</div>
                <p className="text-gray-300 italic mb-4">"The texture feels incredibly lightweight and leaves my skin glowing without feeling greasy."</p>
              </div>
              <div className="glass-panel p-8">
                <div className="text-[#C9A227] text-2xl mb-4">★★★★★</div>
                <p className="text-gray-300 italic mb-4">"Finally a sunscreen that works beautifully under makeup and doesn't leave a white cast."</p>
              </div>
              <div className="glass-panel p-8">
                <div className="text-[#C9A227] text-2xl mb-4">★★★★★</div>
                <p className="text-gray-300 italic mb-4">"It feels more like luxury skincare than sunscreen."</p>
              </div>
            </div>
          </section>

          {/* SECTION 9 — FINAL CTA */}
          <section className="section final-cta">
            <div className="content glass-panel max-w-3xl mx-auto p-12 text-center">
              <h2 className="text-5xl md:text-6xl mb-6 text-gradient font-serif">Your Everyday Essential for Radiant Protection</h2>
              <p className="text-xl text-gray-300 mb-10">
                Experience lightweight SPF protection designed for modern skin and everyday comfort.
              </p>
              <div className="flex gap-4 justify-center flex-wrap mb-10">
                <button className="cta-button text-lg px-12 py-4">Buy Now</button>
                <button className="cta-button secondary text-lg px-12 py-4">Explore Collection</button>
              </div>
              
              <div className="flex gap-6 justify-center text-xs text-[#C9A227] uppercase tracking-widest flex-wrap">
                <span>Cruelty Free</span>
                <span>•</span>
                <span>Paraben Free</span>
                <span>•</span>
                <span>Suitable for All Skin Types</span>
                <span>•</span>
                <span>Dermatologically Tested</span>
              </div>
            </div>
          </section>
          
          {/* FOOTER */}
          <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 px-10 z-20 relative">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
              <div className="max-w-sm">
                <h2 className="text-3xl font-serif text-white mb-4">SOLÉA</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  SOLÉA creates modern skincare essentials designed to combine daily protection with luxurious simplicity.
                </p>
              </div>
              
              <div className="flex gap-16">
                <div>
                  <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Explore</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Shop</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Ingredients</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Reviews</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Support</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">FAQs</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} SOLÉA. All rights reserved.</p>
              <p className="text-[#C9A227] tracking-widest uppercase mt-4 md:mt-0">Protect Your Glow Every Day.</p>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}

export default App;
