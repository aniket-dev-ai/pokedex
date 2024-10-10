// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import pokemongif from '../Assests/pokeball-loader.gif'
const Navbar = () => {
  return (
    <nav className="bg-black h-[11vh] p-4 uppercase font-bold">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold pr-4  border-r-2">
            <img src={pokemongif} alt='poke' className='h-[8vh] w-[5vw] '></img>
        </div>
        <div className='text-[2vh] flex w-full justify-around items-center'>
          <Link to="/" className="text-white mx-4">Home</Link>
          <Link to="/pokelopedia" className="text-white mx-4">Pokelopedia</Link>
          <Link to="/game" className="text-white mx-4">Game</Link>
          <Link to="/about" className="text-white mx-4">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
