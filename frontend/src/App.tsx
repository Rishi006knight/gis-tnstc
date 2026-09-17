import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { GeneralInfoPage } from './pages/GeneralInfoPage';
import { MotelMapPage } from './pages/MotelMapPage';
import { TrainingInstituteMapPage } from './pages/TrainingInstituteMapPage';
import { FareCalculatorPage } from './pages/FareCalculatorPage';
import { SetcDashboard } from './pages/SetcDashboard';
import { SetcHistoryPage } from './pages/SetcHistoryPage';
import { SetcReservationCentresMapPage } from './pages/SetcReservationCentresMapPage';
import { SetcDepotsMapPage } from './pages/SetcDepotsMapPage';
import { SetcRoutesMapPage } from './pages/SetcRoutesMapPage';
import { SetcSpecialServicesPage } from './pages/SetcSpecialServicesPage';

export const App: React.FC = () => {
  // Sync state with URL hash for easy bookmarking and refresh
  const getInitialPage = (): PageView => {
    const hash = window.location.hash.replace('#', '') as PageView;
    const validPages: PageView[] = ['home', 'general-info', 'motels', 'training-institutes', 'fare-calculator',
      'setc', 'setc-routes', 'setc-reservation-centres', 'setc-depots', 'setc-special-services', 'setc-history'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageView>(getInitialPage);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      const validPages: PageView[] = ['home', 'general-info', 'motels', 'training-institutes', 'fare-calculator',
        'setc', 'setc-routes', 'setc-reservation-centres', 'setc-depots', 'setc-special-services', 'setc-history'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Sticky Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'general-info' && <GeneralInfoPage onNavigate={handleNavigate} />}
        {currentPage === 'motels' && <MotelMapPage />}
        {currentPage === 'training-institutes' && <TrainingInstituteMapPage />}
        {currentPage === 'fare-calculator' && <FareCalculatorPage />}
        
        {/* Phase 2: SETC Modules */}
        {currentPage === 'setc' && <SetcDashboard onNavigate={handleNavigate} />}
        {currentPage === 'setc-routes' && <SetcRoutesMapPage onNavigate={handleNavigate} />}
        {currentPage === 'setc-reservation-centres' && <SetcReservationCentresMapPage onNavigate={handleNavigate} />}
        {currentPage === 'setc-depots' && <SetcDepotsMapPage onNavigate={handleNavigate} />}
        {currentPage === 'setc-special-services' && <SetcSpecialServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'setc-history' && <SetcHistoryPage onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
