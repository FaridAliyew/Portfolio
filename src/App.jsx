import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection, { PROJECTS_DATA } from './components/SkillsSection';
import Footer from './components/Footer';
import ProjectDetailPage from './components/ProjectDetailPage';
import PageTransitionCurtain from './components/PageTransitionCurtain';
import PagePreloader from './components/PagePreloader';

const COVER_DURATION   = 960;
const LOCK_DURATION    = 80;
const UNCOVER_DURATION = 960;

export default function App() {
  const [activeProject,    setActiveProject]    = useState(null);
  const [transitionStatus, setTransitionStatus] = useState('idle');
  const [transitionName,   setTransitionName]   = useState('');
  const returnScrollPosRef = useRef(0);

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
      window.scrollTo(0, 0);
    });
  };

  const handleBackToPortfolio = () => {
    runTransition('FARID ALIYEV', () => {
      setActiveProject(null);
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo({ top: returnScrollPosRef.current || 0, behavior: 'instant' });
      });
    });
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const idx      = PROJECTS_DATA.findIndex((p) => p.id === activeProject.id);
    const nextProj = PROJECTS_DATA[(idx + 1) % PROJECTS_DATA.length];

    runTransition(nextProj.title, () => {
      setActiveProject(nextProj);
      window.scrollTo(0, 0);
    });
  };

  return (
    <div className="app-container">
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
