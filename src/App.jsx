import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Journey from "./components/Journey.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import SocialRail from "./components/SocialRail.jsx";
import { initTilt } from "./lib/tilt.js";

export default function App() {
  useEffect(() => initTilt(), []);

  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <Nav />
      <SocialRail />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
      <div
        id="glaze-sheet"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{ translate: "105% 0" }}
      >
        <div className="glaze-fill absolute inset-0" />
      </div>
    </div>
  );
}
