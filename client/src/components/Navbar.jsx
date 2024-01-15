import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./NavbarComponents/Logo";
import Buttons from "./NavbarComponents/Buttons";
import ButtonsMobile from "./NavbarComponents/ButtonsMobile";
import Links from "./NavbarComponents/Links";

function Navbar() {
  const [active, setActive] = useState(false);

  const onSetActive = (s) => {
    console.log(s);
    setActive(s);
  };

  return (
    <nav className="h-0">
      <Logo />
      <Links />
      {/* <Buttons /> */}

      {/* <ButtonsMobile onSetActive={onSetActive} activeState={active} /> */}

      {/* <div className="block sm:hidden ml-4">
        <AiOutlineMenu
          onClick={() => setActive(true)}
          className="fill-emerald-800 w-6 h-6 cursor-pointer"
        />
      </div> */}
    </nav>
  );
}

export default Navbar;
