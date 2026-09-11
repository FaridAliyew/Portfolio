import React, { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection, { PROJECTS_DATA } from './components/SkillsSection';
import Footer from './components/Footer';
import ProjectDetailPage from './components/ProjectDetailPage';
import PageTransitionCurtain from './components/PageTransitionCurtain';
import PagePreloader from './components/PagePreloader';
import CustomCursor from './components/CustomCursor';

const COVER_DURATION   = 960;
const LOCK_DURATION    = 80;
const UNCOVER_DURATION = 960;

export default function App() {
  const [activeProject,    setActiveProject]    = useState(null);
  const [transitionStatus, setTransitionStatus] = useState('idle');
  const [transitionName,   setTransitionName]   = useState('');
  const returnScrollPosRef = useRef(0);
  const lenisRef           = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis   = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  const runTransition = (newName, onSwap) => {
    if (transitionStatus !== 'idle') return;

    setTransitionName(newName);
    setTransitionStatus('covering');

    setTimeout(() => {
      setTransitionStatus('covered');
      onSwap();

      setTimeout(() => {
        setTransitionStatus('uncovering');

        setTimeout(() => {
          setTransitionStatus('idle');
        }, UNCOVER_DURATION);
      }, LOCK_DURATION);
    }, COVER_DURATION);
  };

  const handleOpenProject = (project) => {
    returnScrollPosRef.current = window.scrollY;

    runTransition(project.title, () => {
      setActiveProject(project);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
  };

  const handleBackToPortfolio = () => {
    runTransition('FARID ALIYEV', () => {
      setActiveProject(null);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      requestAnimationFrame(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(returnScrollPosRef.current || 0, { immediate: true });
        } else {
          window.scrollTo({ top: returnScrollPosRef.current || 0, behavior: 'instant' });
        }
      });
    });
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const idx      = PROJECTS_DATA.findIndex((p) => p.id === activeProject.id);
    const nextProj = PROJECTS_DATA[(idx + 1) % PROJECTS_DATA.length];

    runTransition(nextProj.title, () => {
      setActiveProject(nextProj);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
  };

  return (
    <div className="app-container">
      <CustomCursor />
      <PagePreloader />
      <PageTransitionCurtain status={transitionStatus} projectName={transitionName} />

      {activeProject ? (
        <ProjectDetailPage
          project={activeProject}
          onBack={handleBackToPortfolio}
          onNextProject={handleNextProject}
        />
      ) : (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <SkillsSection onSelectProject={handleOpenProject} />
          <Footer />
        </>
      )}
    </div>
  );
}
