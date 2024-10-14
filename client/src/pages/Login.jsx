// src/Components/Login.js
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaGoogle } from "react-icons/fa";

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
          {!isSignIn ? (
            <div className="flex flex-col items-center">
              <h1 className="text-4xl lg:text-6xl 2xl:text-9xl font-bold mb-10 max-md:mr-0 max-lg:mr-16">
                New here?
              </h1>
              <p className="w-3/4 text-base lg:text-lg captalise mb-6 max-md:mr-0 max-lg:mr-10">
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
                className="bg-white text-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 hover:border-4 transition-all duration-150 rounded-full font-semibold flex gap-1 items-center"
                onClick={() => setIsSignIn(true)}
              >
                <span>
                  <FaArrowLeft />
                </span>
                <span>SIGN IN</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col  items-center">
              <h1 className="text-4xl lg:text-6xl 2xl:text-9xl font-bold mb-5 md:mb-14 max-md:ml-0 max-lg:ml-16">
                One of us?
              </h1>
              <p className="w-3/4 text-base lg:text-lg captalise mb-3 md:mb-6 max-md:ml-0 max-lg:ml-16">
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
                className="bg-white text-yellow-500  hover:text-white hover:bg-yellow-500 hover:border-4 transition-all duration-150 px-6 py-2 rounded-full font-semibold flex items-center gap-1"
                onClick={() => setIsSignIn(false)}
              >
                <span>SIGN UP</span>
                <span>
                  <FaArrowRight />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        className={`w-1/2 overflow-hidden flex justify-center bg-gray-700   items-center transition-transform duration-500 max-sm:w-full max-sm:rounded-3xl ${
          isSignIn
            ? "max-sm:rotate-0 sm:translate-x-0 sm:rounded-e-3xl"
            : "max-sm:-rotate-[360deg] sm:-translate-x-full sm:rounded-s-3xl"
        }`}
      >
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
};

// SignIn Component
const SignIn = ({ setIsSignIn }) => {
  return (
    <div className="w-full max-w-md p-8">
      <h2 className="text-3xl font-bold mb-6">Sign in</h2>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border text-black rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border text-black rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900"
          />
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-full font-semibold">
          SIGN IN
        </button>
      </form>

      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center space-x-3 mt-4">
          <p>Or Sign in with</p>
          <button className="max-[730px]:text-base text-lg font-bold flex items-center gap-1 p-1 rounded-lg border-4 border-s-blue-700 border-t-red-700 border-e-yellow-500 border-b-green-600 hover:scale-95">
            <span>Google</span>
            <span>
              <FaGoogle />
            </span>
          </button>
        </div>
        <button
          className="text-yellow-500 m-2 hover:underline hover:scale-105 transition-all duration-150 font-semibold flex items-center gap-1 sm:hidden"
          onClick={() => setIsSignIn(false)}
        >
          <span>SIGN UP</span>
          <span>
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

// SignUp Component
const SignUp = ({ setIsSignIn }) => {
  return (
    <div className="w-full max-w-md p-8">
      <h2 className="text-3xl font-bold mb-6">Sign up</h2>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border text-black rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border text-black rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border text-black  rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900"
          />
        </div>
        <button className="w-full bg-yellow-500 text-white  py-2 rounded-full font-semibold">
          SIGN UP
        </button>
      </form>

      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center space-x-2 my-4">
          <p>Or Sign up with</p>
          <button className="max-[730px]:text-base text-lg font-bold flex items-center gap-1 p-1 rounded-lg border-4 border-s-blue-700 border-t-red-700 border-e-yellow-500 border-b-green-600 hover:scale-95">
            <span>Google</span>
            <span>
              <FaGoogle />
            </span>
          </button>
        </div>
        <button
          className="text-yellow-500 m-2 hover:underline hover:scale-105 transition-all duration-150 font-semibold flex items-center gap-1 sm:hidden"
          onClick={() => setIsSignIn(true)}
        >
          <span>SIGN IN</span>
          <span>
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
