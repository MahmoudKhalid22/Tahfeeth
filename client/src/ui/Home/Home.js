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
      <div className="mr-[20%]">
        <Proposal />
      </div>
      <div className="mr-[22.5%]">
        <About />
        <Teachers />
        <Contact />
      </div>
      <div className="mr-[20%]">
        <Footer />
      </div>
    </>
  );
}

export default Home;
