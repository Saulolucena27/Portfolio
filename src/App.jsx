import { useState, useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { AnimationProvider } from "./context/AnimationContext";
import "./App.css";
import Technologies from "./components/Technologies";
import WhyTiger from "./components/WhyTiger";
import GlobalScrollEffects from "./components/GlobalScrollEffects";
import HorizontalScroll from "./components/HorizontalScroll";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicializa Lenis para smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimationProvider>
      <div className="App">
        {isLoading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <>
            <GlobalScrollEffects />
            <CustomCursor />
            <NavBar />
            <Hero />
            <About />
            <WhyTiger />
            <Projects />
            <HorizontalScroll />
            <Technologies />
            <Skills />
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </AnimationProvider>
  );
}

export default App;
