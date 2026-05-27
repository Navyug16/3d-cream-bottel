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
      <div className="fixed top-0 left-0 w-full bg-[#050505] border-b border-white/5 py-3 z-50 flex items-center justify-center">
        <span className="text-xs md:text-sm text-[#C9A227] uppercase tracking-[0.2em] font-medium text-center w-full">
          Free Shipping on All Orders Above ₹999
        </span>
      </div>
      
      <div className="app-container pt-12" ref={appRef}>
        <Scene />
        <div className="ambient-glow" />

        <main className="scroll-content">
          {/* SECTION 1 — HERO */}
          <section className="section hero min-h-screen relative flex items-center pt-20">
            <div className="content max-w-3xl z-10">
              <motion.h1 
                className="text-6xl md:text-8xl mb-8 leading-[1.1] font-serif tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                The Future of <br/>
                <span className="text-gradient">Daily Sun Care</span>
              </motion.h1>
              <motion.p 
                className="text-2xl text-[#C9A227] mb-6 font-serif italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.6 }}
              >
                A lightweight SPF 50+ sunscreen designed to protect, hydrate, and glow with every application.
              </motion.p>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                Created for modern lifestyles, SOLÉA combines advanced UV protection with a breathable skin-first formula that feels invisible while delivering all-day comfort.
              </motion.p>
              
              <motion.div 
                className="flex gap-6 flex-wrap mt-8 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.1 }}
              >
                <button className="cta-button">Shop Now</button>
                <button className="cta-button secondary">Discover More</button>
              </motion.div>
              
              <motion.div 
                className="flex gap-6 text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] flex-wrap mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.4 }}
              >
                <span>SPF 50+</span>
                <span className="text-[#C9A227]">|</span>
                <span>Lightweight</span>
                <span className="text-[#C9A227]">|</span>
                <span>Water Resistant</span>
                <span className="text-[#C9A227]">|</span>
                <span>Dermatologically Tested</span>
              </motion.div>

              <motion.div 
                className="mt-8 text-xs uppercase tracking-[0.3em] text-[#C9A227] flex items-center gap-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.8 }}
              >
                <span>Scroll to explore</span>
                <span className="animate-bounce text-lg">↓</span>
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
          <section className="section features min-h-screen py-20 relative">
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-center text-gradient font-serif">Designed for Everyday Skin</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass-panel text-center hover:-translate-y-2 transition-transform duration-300" style={{ padding: '3rem' }}>
                  <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Invisible Finish</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">Blends naturally into all skin tones with zero residue.</p>
                </div>
                <div className="glass-panel text-center hover:-translate-y-2 transition-transform duration-300" style={{ padding: '3rem' }}>
                  <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Hydration Boost</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">Infused with moisture-locking ingredients to maintain soft and healthy-looking skin.</p>
                </div>
                <div className="glass-panel text-center hover:-translate-y-2 transition-transform duration-300" style={{ padding: '3rem' }}>
                  <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Lightweight Feel</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">Breathable texture designed for daily wear under makeup or alone.</p>
                </div>
                <div className="glass-panel text-center hover:-translate-y-2 transition-transform duration-300" style={{ padding: '3rem' }}>
                  <h3 className="text-[#C9A227] text-2xl mb-4 font-serif">Advanced UV Defense</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">Broad-spectrum SPF 50+ protection against UVA and UVB exposure.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 — INGREDIENT HIGHLIGHTS */}
          <section className="section case-study">
            <div className="content glass-panel max-w-xl">
              <h2 className="text-4xl md:text-5xl mb-10 text-gradient font-serif">Powered by Skin-Loving Ingredients</h2>
              
              <div className="space-y-6">
                {[
                  { title: "Hyaluronic Acid", desc: "Helps maintain deep hydration for smoother and healthier skin." },
                  { title: "Vitamin E", desc: "Provides antioxidant support to protect against environmental stress." },
                  { title: "Niacinamide", desc: "Helps improve skin texture and supports a balanced complexion." },
                  { title: "Aloe Vera Extract", desc: "Soothes and refreshes skin exposed to heat and sunlight." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <h3 className="text-2xl text-[#C9A227] font-serif mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
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
                {[
                  { num: "01", title: "Prep & Apply", desc: "Apply generously to clean skin 15 minutes before sun exposure." },
                  { num: "02", title: "Blend", desc: "Blend evenly across face and neck using gentle upward motions." },
                  { num: "03", title: "Maintain", desc: "Reapply every 2 hours for continuous protection, especially after swimming or sweating." }
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-4 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-[#C9A227] text-2xl font-serif group-hover:scale-110 transition-transform origin-left">{step.num}</div>
                    <div>
                      <h3 className="text-xl text-white mb-2 font-medium">{step.title}</h3>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 — CUSTOMER REVIEWS */}
          <section className="section features min-h-[70vh] py-20 relative">
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-center text-gradient font-serif">Loved by Everyday Skin</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="glass-panel" style={{ padding: '3rem' }}>
                  <div className="text-[#C9A227] text-2xl mb-6">★★★★★</div>
                  <p className="text-gray-300 italic text-lg leading-relaxed">"The texture feels incredibly lightweight and leaves my skin glowing without feeling greasy."</p>
                </div>
                <div className="glass-panel" style={{ padding: '3rem' }}>
                  <div className="text-[#C9A227] text-2xl mb-6">★★★★★</div>
                  <p className="text-gray-300 italic text-lg leading-relaxed">"Finally a sunscreen that works beautifully under makeup and doesn't leave a white cast."</p>
                </div>
                <div className="glass-panel" style={{ padding: '3rem' }}>
                  <div className="text-[#C9A227] text-2xl mb-6">★★★★★</div>
                  <p className="text-gray-300 italic text-lg leading-relaxed">"It feels more like luxury skincare than sunscreen."</p>
                </div>
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
          <footer id="main-footer" className="w-full bg-[#030303] border-t border-white/5 pt-32 pb-16 px-10 z-[100] relative overflow-hidden flex flex-col items-center">
            {/* Massive background typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden leading-none select-none pointer-events-none opacity-[0.03] flex items-center justify-center">
              <h1 className="text-[28vw] font-serif font-bold text-white whitespace-nowrap">SOLÉA</h1>
            </div>
            
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-24 relative z-10">
              <div className="max-w-md">
                <h2 className="text-5xl font-serif text-white mb-8 tracking-wide">SOLÉA</h2>
                <p className="text-gray-400 text-xl leading-relaxed font-serif italic mb-8">
                  SOLÉA creates modern skincare essentials designed to combine daily protection with luxurious simplicity.
                </p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A227] hover:border-[#C9A227] hover:text-black transition-all cursor-pointer text-white">
                    <span className="text-sm tracking-wider">Ig</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A227] hover:border-[#C9A227] hover:text-black transition-all cursor-pointer text-white">
                    <span className="text-sm tracking-wider">X</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-24">
                <div>
                  <h3 className="text-white font-medium mb-8 uppercase tracking-[0.2em] text-sm">Explore</h3>
                  <ul className="space-y-5 text-gray-400 text-lg">
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Shop</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Ingredients</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Reviews</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-8 uppercase tracking-[0.2em] text-sm">Support</h3>
                  <ul className="space-y-5 text-gray-400 text-lg">
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">FAQs</a></li>
                    <li><a href="#" className="hover:text-[#C9A227] transition-colors">Shipping Returns</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 relative z-10">
              <p className="tracking-wider">&copy; {new Date().getFullYear()} SOLÉA. All rights reserved.</p>
              <p className="text-[#C9A227] tracking-[0.2em] uppercase mt-4 md:mt-0 font-medium">Protect Your Glow Every Day.</p>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}

export default App;
