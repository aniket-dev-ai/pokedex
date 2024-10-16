// src/Components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokemongif from "../assets/pokeball-loader.gif";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/sign-out`,
        {
          method: "POST",
        }
      );
      const data = await res.json();

      navigate("/login");

      await dispatch(setUser(null));

      toast(data?.message, {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: data?.success ? "green" : "red",
          color: "white",
        },
      });
    } catch (error) {
      console.log(error);
      toast("Something went wrong!", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
          {currentUser && (
            <Link
              to="/profile"
              className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
            >
              {currentUser?.userName}
            </Link>
          )}
          <Link
            to="/about"
            className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
          >
            About
          </Link>
          {!currentUser ? (
            <Link
              to="/login"
              className="font-semibold text-white hover:border-b-2 border-b-yellow-500 p-2 w-full text-center"
            >
              Login
            </Link>
          ) : (
            <button
              className="font-semibold text-white hover:border-b-2 border-b-red-500 hover:text-red-500 p-2 w-full text-center flex items-center justify-center gap-1 disabled:opacity-50"
              onClick={handleSignOut}
              disabled={loading}
            >
              <span>Logout</span>
              <span>
                <FaSignOutAlt />
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
