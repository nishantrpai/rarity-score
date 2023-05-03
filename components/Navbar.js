import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Navbar({ title, menu, showMenu, setShowMenu }) {
  return (
    <div className="bg-black w-full flex justify-between items-center p-4">
      <a className="text-lg text-white font-medium" href="/">
        {title}
      </a>
      {menu && (
        <div
          className="md:hidden text-md text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      )}
    </div>
  );
}

export default Navbar;
