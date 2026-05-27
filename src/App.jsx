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
              <h2 className="font-serif text-2xl text-[#EAEAEA] tracking-widest uppercase">Initializing Experience</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
      
      <div className="app-container" ref={appRef}>
        <Scene />
        <div className="ambient-glow" />

        <main className="scroll-content">
          {/* SECTION 1 — HERO */}
          <section className="section hero">
            <div className="content glass-panel max-w-2xl">
              <motion.h1 
                className="text-5xl md:text-7xl mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.2 }}
              >
                Future of <br/>
                <span className="text-gradient">Interactive Product</span> Experiences
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                Immersive 3D websites designed for modern brands, luxury products, and next-generation digital storytelling.
              </motion.p>
              <motion.div 
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                <button className="cta-button">Explore Experience</button>
                <button className="cta-button secondary">View Case Study</button>
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
              <h2 className="text-4xl md:text-5xl mb-6 text-gradient">Crafted for Premium Brands</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                This interactive 3D experience combines cinematic motion, realistic lighting, and smooth user interaction to create a modern digital product showcase.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Built using advanced web technologies including Three.js, React Three Fiber, GSAP, and immersive scroll-based animation.
              </p>
            </div>
          </section>

          {/* SECTION 3 — FEATURES */}
          <section className="section features">
            <h2 className="text-4xl md:text-5xl mb-12 text-center text-gradient">The Architecture of Luxury</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="text-[#C9A227] text-4xl mb-4">✦</div>
                <h3 className="text-2xl mb-4">Realistic 3D Rendering</h3>
                <p className="text-gray-400">Physically accurate materials, reflections, shadows, and cinematic lighting.</p>
              </div>
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="text-[#C9A227] text-4xl mb-4">✧</div>
                <h3 className="text-2xl mb-4">Smooth Scroll Animation</h3>
                <p className="text-gray-400">Storytelling-driven interactions synchronized perfectly with user movement.</p>
              </div>
              <div className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="text-[#C9A227] text-4xl mb-4">✹</div>
                <h3 className="text-2xl mb-4">Optimized Performance</h3>
                <p className="text-gray-400">Fast-loading immersive experiences designed seamlessly for modern devices.</p>
              </div>
            </div>
          </section>

          {/* SECTION 4 — TECHNOLOGY STACK */}
          <section className="section tech-stack">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 text-gradient">Powered by Modern Web Technology</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Developed with the latest frameworks to deliver high-performance interactive experiences without compromising on visual fidelity.
              </p>
            </div>
            <div className="marquee-container">
              <div className="marquee-content">
                <span className="tech-pill">Three.js</span>
                <span className="tech-pill">React Three Fiber</span>
                <span className="tech-pill">GSAP</span>
                <span className="tech-pill">Tailwind CSS</span>
                <span className="tech-pill">WebGL</span>
                <span className="tech-pill">Framer Motion</span>
                {/* Duplicate for infinite loop */}
                <span className="tech-pill">Three.js</span>
                <span className="tech-pill">React Three Fiber</span>
                <span className="tech-pill">GSAP</span>
                <span className="tech-pill">Tailwind CSS</span>
                <span className="tech-pill">WebGL</span>
                <span className="tech-pill">Framer Motion</span>
              </div>
            </div>
          </section>

          {/* SECTION 5 — CASE STUDY */}
          <section className="section case-study">
            <div className="content glass-panel max-w-xl">
              <h2 className="text-4xl md:text-5xl mb-6 text-gradient">Design Meets Interaction</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                This concept project demonstrates how modern brands can transform traditional product pages into immersive digital experiences that instantly increase engagement and visual impact.
              </p>
              <ul className="text-gray-400 space-y-3 list-disc list-inside">
                <li>Cinematic image transitions</li>
                <li>Scroll-triggered animations</li>
                <li>Floating UI motion</li>
                <li>Parallax movement</li>
              </ul>
            </div>
          </section>

          {/* SECTION 6 — ABOUT DEVELOPER */}
          <section className="section about">
            <div className="content glass-panel max-w-xl text-right ml-auto">
              <h2 className="text-4xl md:text-5xl mb-6 text-gradient">Built by Navyug Galani</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Frontend developer focused on immersive websites, interactive 3D experiences, and modern digital interfaces.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Specialized in creating visually engaging product showcases and high-converting landing experiences for leading brands and fast-growing startups.
              </p>
              <button className="cta-button secondary">View Resume</button>
            </div>
          </section>

          {/* SECTION 7 — FINAL CTA */}
          <section className="section final-cta">
            <div className="content glass-panel max-w-3xl mx-auto p-12">
              <h2 className="text-5xl md:text-6xl mb-6 text-gradient">Want a Website That Feels Like the Future?</h2>
              <p className="text-xl text-gray-300 mb-10">
                Let's build immersive digital experiences that make your brand absolutely unforgettable.
              </p>
              <button className="cta-button text-lg px-12 py-4">Start a Project</button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
