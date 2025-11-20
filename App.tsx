
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { 
  HeroSection, 
  ServicesSection, 
  PortfolioSection, 
  CompanySection, 
  CareersSection, 
  ContactSection 
} from './components/GeneratedSite';
import { AIChatWidget } from './components/LoadingScreen';

const Logo = ({ isScrolled, isDarkBg }: { isScrolled: boolean, isDarkBg: boolean }) => (
  <div className="flex items-center group cursor-pointer">
    <div className={`relative h-14 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
      <img 
        src="data:image/jpeg;base64,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"
        alt="Mac Shiobara Logo"
        className="w-full h-full object-contain"
      />
    </div>
  </div>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Simple state-based router: 'home' or 'company'
  const [currentPage, setCurrentPage] = useState<'home' | 'company'>('home');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (destination: string) => {
    setIsMenuOpen(false);

    // Navigate to Company Page
    if (destination === 'company') {
      setCurrentPage('company');
      window.scrollTo(0, 0);
      return;
    }

    // Navigate to Home or Home Sections
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // If switching from Company to Home, wait for render then scroll
      setTimeout(() => {
        if (destination === 'home') {
          window.scrollTo(0, 0);
        } else {
          const element = document.getElementById(destination);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on Home
      if (destination === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(destination);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const NavLink = ({ target, label }: { target: string, label: string }) => {
    const isActive = (target === 'company' && currentPage === 'company');
    
    return (
      <button 
        onClick={() => handleNavigation(target)}
        className={`hover:text-green-600 transition-colors uppercase tracking-wider text-sm font-medium relative group ${isActive ? 'text-green-600' : ''}`}
      >
        {label}
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </button>
    );
  };

  // Logic to determine if Navbar should use dark or light text
  // Home Page: Transparent at top (White text), White when scrolled (Dark text)
  // Company Page: Always dark bg (White text) -> But Navbar is shared.
  // If Company Page, let's keep navbar transparent background but always white text? 
  // CompanySection has bg-slate-900.
  const isDarkBg = currentPage === 'company';
  
  // Navigation Text Color
  // On Home: White at top, Dark when scrolled
  // On Company: White at top (bg is dark), Dark when scrolled (bg is white)
  // So logic remains mostly same, just check if scrolled.
  const navTextColor = isScrolled ? 'text-slate-600' : 'text-white/90';
  const logoTextColor = isScrolled ? 'text-slate-900' : 'text-white';
  const mobileMenuColor = isScrolled ? 'text-slate-900' : 'text-white';

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => handleNavigation('home')} className="flex items-center gap-2">
            <Logo isScrolled={isScrolled} isDarkBg={isDarkBg} />
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex gap-8 items-center ${navTextColor}`}>
            <NavLink target="home" label="Home" />
            <NavLink target="業務内容" label="業務内容" />
            <NavLink target="施工実績" label="施工実績" />
            <NavLink target="company" label="会社概要" />
            <NavLink target="採用情報" label="採用情報" />
            <button 
              onClick={() => handleNavigation('contact')}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-sm font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden ${mobileMenuColor}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden text-slate-900 animate-fade-in">
            <NavLink target="home" label="Home" />
            <NavLink target="業務内容" label="業務内容" />
            <NavLink target="施工実績" label="施工実績" />
            <NavLink target="company" label="会社概要" />
            <NavLink target="採用情報" label="採用情報" />
            <NavLink target="contact" label="Contact" />
          </div>
        )}
      </nav>

      {/* Main Content Router */}
      {currentPage === 'home' ? (
        <>
          <HeroSection onContactClick={() => handleNavigation('contact')} />
          <ServicesSection />
          <PortfolioSection />
          <CareersSection />
          <ContactSection />
        </>
      ) : (
        <div className="min-h-screen bg-slate-900 pt-20 animate-fade-in">
           <CompanySection />
        </div>
      )}
      
      <footer className="bg-slate-950 text-slate-500 py-12 px-6 text-center text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 Mac Shiobara Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-green-500">Privacy Policy</a>
            <a href="#" className="hover:text-green-500">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* AI Consultant Widget */}
      <AIChatWidget />

    </div>
  );
};

export default App;
