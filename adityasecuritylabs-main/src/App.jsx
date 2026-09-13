import React from 'react';
import useLenis from './hooks/useLenis';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Ticker from './components/Ticker/Ticker';
import Capabilities from './components/Capabilities/Capabilities';
import Research from './components/Research/Research';
import CVEs from './components/CVEs/CVEs';
import Founder from './components/Founder/Founder';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import './tokens.css';
import './global.css';

export default function App() {
  useLenis();

  return (
    <div>
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Capabilities />
        <Research />
        <CVEs />
        <Founder />
        <HowItWorks />
        <Pricing />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
