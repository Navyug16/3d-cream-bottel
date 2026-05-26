import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import { Scene } from './components/Scene';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade up the glass panels
      const panels = gsap.utils.toArray('.glass-panel');
      panels.forEach((panel) => {
        gsap.fromTo(panel, 
          { y: 60, opacity: 0 },
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

      // 2. Dynamic Background Colors on scroll
      const sections = gsap.utils.toArray('.section');
      // Using highly distinct luxury colors
      const colors = [
        { bg: '#FDFBF7', text: '#1a1a1a' }, // Hero
        { bg: '#FDFBF7', text: '#1a1a1a' }, // Ingredients
        { bg: '#EFEBE4', text: '#1a1a1a' }, // SPF (Beige)
        { bg: '#FDFBF7', text: '#1a1a1a' }, // Benefits
        { bg: '#EFEBE4', text: '#1a1a1a' }, // How to (Beige)
        { bg: '#FDFBF7', text: '#1a1a1a' }, // Glossary
        { bg: '#EFEBE4', text: '#1a1a1a' }, // Reviews
        { bg: '#FDFBF7', text: '#1a1a1a' }, // FAQ
        { bg: '#D11A2A', text: '#ffffff' }  // Checkout (Luxury Red - needs white text)
      ];

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => gsap.to(document.body, { backgroundColor: colors[index].bg, color: colors[index].text, duration: 0.8, overwrite: 'auto' }),
          onEnterBack: () => gsap.to(document.body, { backgroundColor: colors[index].bg, color: colors[index].text, duration: 0.8, overwrite: 'auto' }),
        });
      });

    }, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="app-container" ref={appRef}>
      <Scene />

      {/* HTML Overlay Sections */}
      <main className="scroll-content">
        <section className="section hero">
          <div className="content glass-panel">
            <h1>The Future of <span className="text-gradient">Suncare</span></h1>
            <p className="subtitle">Invisible protection. Unbeatable glow. Experience the next generation of daily SPF.</p>
            <p className="details">Formulated with dermatologists to provide weightless, broad-spectrum defense while deeply nourishing your skin.</p>
            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <span className="arrow">↓</span>
            </div>
          </div>
        </section>

        <section className="section ingredients">
          <div className="content right-aligned glass-panel">
            <h2>Pure Ingredients</h2>
            <p>Our award-winning formula is powered by nature and perfected by science.</p>
            <ul>
              <li><strong>Zinc Oxide (20%):</strong> Non-nano mineral protection that sits comfortably on the skin without clogging pores.</li>
              <li><strong>Niacinamide:</strong> Visibly minimizes enlarged pores, improves uneven skin tone, and softens fine lines.</li>
              <li><strong>Squalane:</strong> A weightless super-hydrator that locks in essential moisture all day long.</li>
            </ul>
          </div>
        </section>

        <section className="section spf bg-beige">
          <div className="content left-aligned glass-panel">
            <h2>Complete Defense</h2>
            <p>More than just sunburn protection. Our formula shields your skin from the full spectrum of modern environmental stressors.</p>
            <ul>
              <li><strong>Broad Spectrum SPF 50+:</strong> Maximum defense against aging UVA and burning UVB rays.</li>
              <li><strong>Blue Light Shield:</strong> Protects against oxidative stress caused by digital screens.</li>
              <li><strong>Pollution Block:</strong> Antioxidant-rich barrier prevents urban micro-particles from penetrating the skin barrier.</li>
            </ul>
          </div>
        </section>

        <section className="section benefits">
          <div className="content right-aligned glass-panel">
            <h2>Why You'll Love It</h2>
            <ul>
              <li><strong>100% Invisible Finish:</strong> Melts instantly into all skin tones without leaving a chalky white cast.</li>
              <li><strong>Makeup-Gripping Primer:</strong> Leaves a velvety, slightly tacky finish that keeps your makeup locked in place for 12+ hours.</li>
              <li><strong>Reef Safe & Cruelty-Free:</strong> Formulated without oxybenzone or octinoxate. We love the ocean and our furry friends.</li>
            </ul>
          </div>
        </section>

        <section className="section how-to">
          <div className="content left-aligned glass-panel">
            <h2>The Ritual</h2>
            <p>Make suncare the favorite part of your morning routine.</p>
            <ol>
              <li><strong>Prep:</strong> Cleanse and apply your daily moisturizer.</li>
              <li><strong>Apply:</strong> Dispense two full finger-lengths of product. Apply generously to face, neck, and ears as the final step of your skincare routine.</li>
              <li><strong>Wait:</strong> Allow 15 minutes for the formula to set before sun exposure.</li>
              <li><strong>Maintain:</strong> Reapply every 2 hours, or immediately after swimming or heavy sweating.</li>
            </ol>
          </div>
        </section>

        <section className="section glossary">
          <div className="content right-aligned glass-panel">
            <h2>Suncare Glossary</h2>
            <p>Know exactly what's inside your bottle:</p>
            <div className="faq-item">
              <strong>UVA vs UVB</strong>
              <p>UVA rays cause aging, while UVB rays cause burning. Broad spectrum protects against both.</p>
            </div>
            <div className="faq-item">
              <strong>Non-Nano Minerals</strong>
              <p>Zinc particles large enough that they cannot be absorbed into your bloodstream or coral reefs.</p>
            </div>
            <div className="faq-item">
              <strong>PA++++ Rating</strong>
              <p>The highest grade of UVA protection available globally, ensuring maximum defense against photoaging.</p>
            </div>
          </div>
        </section>

        <section className="section reviews">
          <div className="content left-aligned glass-panel">
            <h2>What They Say</h2>
            <div className="review">
              <p className="stars">★★★★★</p>
              <p>"This is the holy grail. It doesn't break me out, leaves zero white cast, and gives my skin this incredible glass-like glow."</p>
              <p className="author">— Sarah M., Verified Buyer</p>
            </div>
            <div className="review">
              <p className="stars">★★★★★</p>
              <p>"I've tried dozens of mineral sunscreens and they all felt heavy or greasy. This feels like a luxury serum. I'm obsessed."</p>
              <p className="author">— Dr. Emily Chen, Dermatologist</p>
            </div>
          </div>
        </section>

        <section className="section faq">
          <div className="content left-aligned glass-panel">
            <h2>Frequent Questions</h2>
            <div className="faq-item">
              <strong>Is it safe for sensitive skin?</strong>
              <p>Yes! Our formula is fragrance-free, non-comedogenic, and hypoallergenic.</p>
            </div>
            <div className="faq-item">
              <strong>Will it sting my eyes?</strong>
              <p>No, our 100% mineral filter is gentle and tear-free.</p>
            </div>
          </div>
        </section>
        
        <section className="section checkout">
          <div className="content centered glass-panel checkout-card">
            <h2>Ready to Glow?</h2>
            <p>Join thousands of others who have upgraded their daily defense.</p>
            <button className="cta-button">Pre-order Now - $38</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
