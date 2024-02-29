import React from "react";

import Proposal from "../components/Proposal";
import About from "../components/About";
import Teachers from "../components/Teachers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Proposal />
      <About />
      <Teachers />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
