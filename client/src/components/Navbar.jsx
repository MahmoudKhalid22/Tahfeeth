import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./NavbarComponents/Logo";
import Buttons from "./NavbarComponents/Buttons";
import ButtonsMobile from "./NavbarComponents/ButtonsMobile";

function Navbar() {
  const [active, setActive] = useState(false);

  const onSetActive = (s) => {
    console.log(s);
    setActive(s);
  };

  return (
    <nav className="flex items-center  justify-between h-28">
      <Logo />
      <Buttons />

      <ButtonsMobile onSetActive={onSetActive} activeState={active} />

      <div className="block sm:hidden ml-4">
        <AiOutlineMenu
          onClick={() => setActive(true)}
          className="fill-emerald-800 w-6 h-6 cursor-pointer"
        />
      </div>
    </nav>
  );
}

export default Navbar;
