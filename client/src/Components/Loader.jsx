import React from "react";
import loaderImg from "../assets/pokeball-loader.gif";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <img src={loaderImg} alt="loader" />
    </div>
  );
};

export default Loader;
