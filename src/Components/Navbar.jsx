// src/Components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import pokemongif from "../assets/pokeball-loader.gif";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black h-[11vh] p-4 uppercase font-bold">
      <div className="flex sm:justify-between sm:items-center max-sm:flex-col gap-2">
        <div className="text-white text-lg font-bold pr-4 w-fit flex max-sm:justify-between max-sm:w-full max-sm:items-center">
          <img
            src={pokemongif}
            alt="poke"
            className="min-h-10 min-w-10 h-[8vh] w-[5vw] border-r-2 pr-2"
          ></img>
          <button
            className="sm:hidden p-2 rounded-lg border hover:scale-90 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
        <div
          className={`text-[2vh] flex w-full justify-around items-center max-sm:flex-col max-sm:space-y-3 max-sm:border-y-2 p-2 transition-all max-sm:duration-500 overflow-hidden max-sm:bg-gray-900 ${
            menuOpen
              ? "max-sm:max-h-96"
              : "max-sm:max-h-0 max-sm:p-0 max-sm:border-none"
          }`}
        >
          <Link
            to="/"
            className="font-semibold text-white mx-4 hover:underline w-full text-center hover:text-base transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/pokelopedia"
            className="font-semibold text-white mx-4 hover:underline w-full text-center hover:text-base transition-all duration-200"
          >
            Pokelopedia
          </Link>
          <Link
            to="/game"
            className="font-semibold text-white mx-4 hover:underline w-full text-center hover:text-base transition-all duration-200"
          >
            Game
          </Link>
          <Link
            to="/about"
            className="font-semibold text-white mx-4 hover:underline w-full text-center hover:text-base transition-all duration-200"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
