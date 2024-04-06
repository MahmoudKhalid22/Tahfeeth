import React from "react";
import "./Home.css";
import Proposal from "../components/Proposal";
import About from "../components/About";
import Teachers from "../components/Teachers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

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
