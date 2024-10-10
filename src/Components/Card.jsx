// src/Components/Card.js
import React from 'react';

const Card = ({ name, image, type }) => {
  return (
    <div className="border-4 border-yellow-600 rounded-lg transition-transform transform hover:scale-95 hover:shadow-[0_0_20px_10px_rgba(255,215,0,0.5)] duration-300 shadow-lg p-4 text-center">
      <img 
        src={image} 
        alt={name} 
        className="mb-2 h-[25vh] mx-auto object-cover rounded-md" // Added object-cover for better image fitting
      />
      <h3 className="text-lg text-white hover:text-yellow-500 font-bold capitalize mb-1">{name}</h3>
      <p className="text-lg text-gray-500">{type}</p>
    </div>
  );
};

export default Card;
