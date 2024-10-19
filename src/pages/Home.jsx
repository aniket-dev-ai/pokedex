// src/Components/Home.js
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="h-full text-center bg-black flex flex-col justify-around mt-10">
      <h1 className="text-7xl sm:text-9xl text-yellow-700 font-bold">
        Welcome {currentUser?.fullName}. to the Pokémon App!
      </h1>
      <p className="mt-4 text-violet-800 text-3xl sm:text-5xl">
        Explore your favorite Pokémon and their evolutions.
      </p>
    </div>
  );
};

export default Home;
