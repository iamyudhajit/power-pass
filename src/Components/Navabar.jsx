import React from 'react'

const Navabar = () => {
  return (
    <nav className="bg-opacity-0 flex justify-between items-center px-10 text-white">
      <div className="logo font-bold flex flex-row justify-center">
        Power Pass
      </div>
      <ul>
        <li className="flex gap-4">
          <a href="http://" className="hover:font-bold">
            Home
          </a>
          <a href="http://" className="hover:font-bold">
            About
          </a>
          <a href="http://" className="hover:font-bold">
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navabar;
