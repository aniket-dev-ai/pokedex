// src/Components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import pokemongif from "../assets/pokeball-loader.gif";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black min-h-[10vh] p-4 uppercase font-bold">
      <div className="flex sm:justify-between sm:items-center max-sm:flex-col gap-2 relative">
        <div className="text-white text-lg font-bold pr-4 w-fit flex max-sm:justify-between max-sm:w-full max-sm:items-center">
          <img
            src={pokemongif}
            alt="poke"
            className="h-14 w-14 sm:h-[74px] sm:w-[74px] border-r-2 pr-2"
          ></img>
          <button
            className="sm:hidden p-2 rounded-lg border hover:scale-90 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaX /> : <FaBars />}
          </button>
        </div>
        <div
          className={`text-[2vh] max-sm:absolute max-sm:left-0 max-sm:right-0 max-sm:top-full max-sm:mt-2 flex w-full justify-around items-center max-sm:flex-col max-sm:space-y-3 max-sm:border-b-2 p-2 transition-all max-sm:duration-[400ms] overflow-hidden max-sm:bg-gray-900 max-sm:z-10 ${
            menuOpen
              ? "max-sm:max-h-96"
              : "max-sm:max-h-0 max-sm:p-0 max-sm:border-none"
          }`}
        >
          <Link
            to="/"
            className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
          >
            Home
          </Link>
          <Link
            to="/pokelopedia"
            className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
          >
            Pokelopedia
          </Link>
          <Link
            to="/game"
            className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
          >
            Game
          </Link>
          <Link
            to="/about"
            className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
          >
            About
          </Link>
          <Link
            to="/login"
            className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
