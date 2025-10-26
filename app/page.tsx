"use client";
import { useState } from "react";
import SerpentineWaveBackground from "../components/SerpentineWaveBackground";
import ModernHeader from "../components/ModernHeader";
import Overview from "../components/sections/overview";
import Projects from "../components/sections/Projects";
import CaseStudies from "../components/sections/CaseStudies";
import TechStack from "../components/sections/TechStack";
import Achievements from "../components/sections/Achievements";
import Contact from "../components/sections/Contact";
import AnimatedCursor from "../components/AnimatedCursor";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "projects":
        return <Projects />;
      case "case-studies":
        return <CaseStudies />;
      case "tech-stack":
        return <TechStack />;
      case "achievements":
        return <Achievements />;
      case "contact":
        return <Contact />;
      default:
        return <Overview />;
    }
  };

  return (
    <>
      <SerpentineWaveBackground />
      <ModernHeader 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <main className="pt-32"> {/* Add padding to account for fixed header */}
        {renderSection()}
      </main>
    </>
  );
}