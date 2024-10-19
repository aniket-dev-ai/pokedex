// src/Components/Login.js
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="w-full flex bg-black p-5">
      {/* Left Section */}
      <div
        className={`w-1/2 flex flex-col justify-center items-center text-white bg-yellow-500 transition-transform duration-500 max-sm:hidden ${
          isSignIn
            ? "translate-x-0 rounded-s-3xl md:rounded-s-full"
            : "translate-x-full rounded-e-3xl md:rounded-e-full"
        }`}
      >
        <div className="flex flex-col  items-center">
          {isSignIn ? (
            <div className="flex flex-col items-center">
              <h1 className="text-4xl 2xl:text-6xl font-bold mb-5 md:mb-14 max-md:ml-0 max-lg:ml-16">
                One of us?
              </h1>
              <p className="w-3/4 text-base xl:text-lg captalise mb-3 md:mb-6 max-md:ml-0 max-lg:ml-16">
                Welcome to the PokéWorld! Ready to embark on your journey to
                become a Pokémon Master? Before you can challenge Gym Leaders
                and capture rare Pokémon, you'll need to log in to your Trainer
                account. Whether you're here to trade, battle, or simply explore
                the vast regions of our PokéUniverse, your adventure begins with
                a quick sign in. Remember, every great Trainer needs to prove
                their worth, so enter your username and password to step into
                the world of Pokémon where every choice can lead to a legendary
                outcome! Are you ready to catch 'em all?
              </p>
              <button
                className="bg-white text-yellow-500 hover:text-white hover:bg-yellow-500 hover:border-4 transition-all duration-150 px-6 py-2 rounded-full font-semibold flex items-center gap-1 max-md:ml-0 max-lg:ml-16"
                onClick={() => setIsSignIn(false)}
              >
                <span>SIGN UP</span>
                <span>
                  <FaArrowRight />
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-4xl 2xl:text-6xl font-bold mb-10 max-md:mr-0 max-lg:mr-16">
                New here?
              </h1>
              <p className="w-3/4 text-base xl:text-lg captalise mb-6 max-md:mr-0 max-lg:mr-10">
                Join the PokéDex! 🎉 So, you want to become a Pokémon Trainer,
                huh? Awesome! 🥳 Before you can start battling Gym Leaders or
                trading Pokémon with friends, you&apos;ll need to create your
                Trainer account. Just think of it as catching your very first
                PokéBall! ⚽️🐾 Sign up now, and let us know your Trainer name,
                email, and secret password (don&apos;t worry, we won&apos;t tell
                Team Rocket! 🚀). With great power comes great responsibility,
                so get ready to explore the PokéWorld and make some
                unforgettable memories! Let&apos;s get this PokéAdventure
                started! 🌟✨
              </p>
              <button
                className="bg-white text-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 hover:border-4 transition-all duration-150 rounded-full font-semibold flex gap-1 items-center max-md:mr-0 max-lg:mr-16"
                onClick={() => setIsSignIn(true)}
              >
                <span>
                  <FaArrowLeft />
                </span>
                <span>SIGN IN</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        className={`w-1/2 overflow-hidden flex justify-center bg-white bg-opacity-10 border items-center transition-transform duration-500 max-sm:w-full max-sm:rounded-3xl ${
          isSignIn
            ? "max-sm:rotate-0 sm:translate-x-0 sm:rounded-e-3xl"
            : "max-sm:-rotate-[360deg] sm:-translate-x-full sm:rounded-s-3xl"
        }`}
      >
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
};

export default Login;
