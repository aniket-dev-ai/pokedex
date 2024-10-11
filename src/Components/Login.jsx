// src/Components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex h-[90vh]  bg-black ">
      {/* Left Section */}
      <div className={`w-1/2 flex flex-col   justify-center items-center text-white bg-yellow-500 transition-transform duration-500 ${isSignIn ? 'translate-x-0 rounded-s-full'  : 'translate-x-full rounded-e-full'}`}>
        <div className="flex flex-col  items-center">
          {isSignIn ? (
            <div className='flex flex-col   items-center'>
              <h1 className="text-9xl font-bold mb-14">New here?</h1>
              <p className="w-3/4 text-xl captalise mb-6">Welcome to the PokéWorld! Ready to embark on your journey to become a Pokémon Master? Before you can challenge Gym Leaders and capture rare Pokémon, you'll need to log in to your Trainer account. Whether you're here to trade, battle, or simply explore the vast regions of our PokéUniverse, your adventure begins with a quick sign in. Remember, every great Trainer needs to prove their worth, so enter your username and password to step into the world of Pokémon where every choice can lead to a legendary outcome! Are you ready to catch 'em all?</p>
              <button 
                className="bg-white text-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 hover:border-4 transition-all duration-150 rounded-full font-semibold"
                onClick={() => setIsSignIn(false)}
              >
                SIGN UP
              </button>
            </div>
          ) : (
            <div className='flex flex-col  items-center'>
              <h1 className="text-9xl font-bold mb-14">One of us?</h1>
              <p className="w-3/4 text-xl captalise mb-6">Join the PokéDex! 🎉 So, you want to become a Pokémon Trainer, huh? Awesome! 🥳 Before you can start battling Gym Leaders or trading Pokémon with friends, you’ll need to create your Trainer account. Just think of it as catching your very first PokéBall! ⚽️🐾 Sign up now, and let us know your Trainer name, email, and secret password (don’t worry, we won’t tell Team Rocket! 🚀). With great power comes great responsibility, so get ready to explore the PokéWorld and make some unforgettable memories! Let’s get this PokéAdventure started! 🌟✨</p>
              <button 
                className="bg-white text-yellow-500  hover:text-white hover:bg-yellow-500 hover:border-4 transition-all duration-150 px-6 py-2 rounded-full font-semibold"
                onClick={() => setIsSignIn(true)}
              >
                SIGN IN
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className={`w-1/2 flex justify-center bg-gray-700   items-center transition-transform duration-500 ${isSignIn ? 'translate-x-0 rounded-e-3xl' : '-translate-x-full rounded-s-3xl'}`}>
        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

// SignIn Component
const SignIn = () => {
  return (
    <div className="w-full max-w-md p-8">
      <h2 className="text-3xl font-bold mb-6">Sign in</h2>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-full font-semibold">
          LOGIN
        </button>
      </form>

      <div className="flex flex-col items-center mt-6">
        <p>Or Sign in with social platforms</p>
        <div className="flex space-x-3 mt-4">
          <a href="#" className="text-2xl text-yellow-500">Facebook</a>
          <a href="#" className="text-2xl text-yellow-500">Twitter</a>
          <a href="#" className="text-2xl text-yellow-500">Google</a>
          <a href="#" className="text-2xl text-yellow-500">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

// SignUp Component
const SignUp = () => {
  return (
    <div className="w-full max-w-md p-8">
      <h2 className="text-3xl font-bold mb-6">Sign up</h2>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button className="w-full bg-yellow-500 text-white  py-2 rounded-full font-semibold">
          SIGN UP
        </button>
      </form>

      <div className="flex flex-col items-center mt-6">
        <p>Or Sign up with social platforms</p>
        <div className="flex space-x-3 mt-4">
          <a href="#" className="text-2xl text-yellow-500">Facebook</a>
          <a href="#" className="text-2xl text-yellow-500">Twitter</a>
          <a href="#" className="text-2xl text-yellow-500">Google</a>
          <a href="#" className="text-2xl text-yellow-500">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
