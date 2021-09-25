import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

function Navbar({ title, menu, showMenu, setShowMenu }) {
  return (
    <div className="bg-black w-full flex justify-between">
      <span>this is the navbar</span>
      <h1>{title}</h1>
      {menu &&
        <div className="md:hidden p-4 text-md text-white" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      }
    </div>
  )
}

export default Navbar;