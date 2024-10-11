// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import Details from "./Details/Details";
import Game from "./Components/Game";
import About from "./Components/About";
import Home from "./Components/Home";
import "./App.css";

const App = () => {
  return (
    <div className="bg-black h-screen text-white scrollbar-hidden">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokelopedia" element={<Cards />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
