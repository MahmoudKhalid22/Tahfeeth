import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

import Proposal from "../components/Proposal";
import About from "../components/About";
import Teachers from "../components/Teachers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  const [activeSection, setActiveSection] = useState(1);

  const [refSection1, inViewSection1] = useInView({ triggerOnce: true });

  const [refSection2, inViewSection2] = useInView({
    triggerOnce: true,
  });

  const [refSection3, inViewSection3] = useInView({
    triggerOnce: true,
  });
  const [refSection4, inViewSection4] = useInView({
    triggerOnce: true,
  });
  const [refSection5, inViewSection5] = useInView({
    triggerOnce: true,
  });

  const handleScroll = (sectionNumber) => {
    setActiveSection(sectionNumber);
  };

  return (
    <>
      sectionNumber={1}
      isActive={activeSection === 1}
      onScroll={() => handleScroll(1)}
      ref={refSection1}
      <Proposal
        sectionNumber={1}
        isActive={activeSection === 1}
        onScroll={() => handleScroll(1)}
        ref={refSection1}
      />
      <About
        sectionNumber={2}
        isActive={activeSection === 2}
        onScroll={() => handleScroll(2)}
        ref={refSection2}
      />
      <Teachers
        sectionNumber={3}
        isActive={activeSection === 3}
        onScroll={() => handleScroll(3)}
        ref={refSection3}
      />
      <Contact
        sectionNumber={4}
        isActive={activeSection === 4}
        onScroll={() => handleScroll(4)}
        ref={refSection4}
      />
      <Footer
        sectionNumber={5}
        isActive={activeSection === 5}
        onScroll={() => handleScroll(5)}
        ref={refSection5}
      />
    </>
  );
}

export default Home;
