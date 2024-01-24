import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  const [activeLink, setActiveLink] = useState(1);

  return (
    <>
      <Navbar activeLink={activeLink} />
      <Outlet onSetActiveLink={setActiveLink} />
    </>
  );
}

export default Root;
