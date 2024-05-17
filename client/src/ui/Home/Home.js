import React, { useEffect, useState } from "react";
import "./Home.css";
import Proposal from "./Proposal";
import About from "./About";
import Teachers from "./Teachers";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <div>
        <Proposal />
      </div>
      <div className="px-6">
        <About />
        <Teachers />
        <Contact />
      </div>
      <div className="relative">
        <Footer />
      </div>
    </>
  );
}

export default Home;
