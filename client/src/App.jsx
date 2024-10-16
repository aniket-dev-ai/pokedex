// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Details from "./pages/Details";
import Game from "./pages/Game";
import About from "./pages/About";
import Login from "./pages/Login";
import "./App.css";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white scrollbar-hidden overflow-hidden flex flex-col">
      <Router>
        <div className="w-full">
          <Toaster />
          <Navbar />
        </div>
        <div className="w-full flex flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokelopedia" element={<Explore />} />
            <Route path="/pokemon/:id" element={<Details />} />
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
