import React from 'react';

function Navbar({ title }) {
  return (
    <div className="bg-black w-full">
      <span>this is the navbar</span>
      <h1>{title}</h1>
    </div>
  )
}

export default Navbar;