// src/Details/Details.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Describe from "./Describe";
import Evolution from "./Evolution";
import Place from "./Place";
import Move from "./Move";
import Loader from "../Components/loader";

const Details = () => {
  // Extracting the Pokémon ID from the URL parameters
  const { id } = useParams();

  // State variables for storing Pokémon details, loading status, and error messages
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variable to track the currently active component
  const [activeComponent, setActiveComponent] = useState("describe");

  // Effect hook to fetch Pokémon details when the component mounts or when the ID changes
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setError("Failed to load Pokémon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  // Render loading state
  if (loading) {
    return (
      <div className="w-full h-3/4 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Render error state
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Render state when no Pokémon details are found
  if (!pokemonDetails)
    return (
      <div className="text-center text-gray-500">No Pokémon details found</div>
    );

  // Function to render the active component based on the user's selection
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "describe":
        return <Describe pokemonData={pokemonDetails} />;
      case "evolution":
        return <Evolution pokemonId={id} />;
      case "place":
        return <Place pokemonId={id} />;
      case "move":
        return <Move pokemonId={id} />;
      default:
        return <Describe pokemonData={pokemonDetails} />;
    }
  };

  return (
    <div className="w-full p-4 min-h-[90vh] bg-black text-yellow-700 flex flex-col justify-between">
      {/* Pokémon Name */}
      <h1 className="text-4xl font-extrabold uppercase w-full text-center mb-4">
        {pokemonDetails.name}
      </h1>

      {/* Render the currently active component */}
      {renderActiveComponent()}

      {/* Footer with navigation buttons */}
      <footer className="mt-4">
        <div className="flex justify-around items-center text-lg xsm:text-2xl font-bold">
          <button
            onClick={() => setActiveComponent("describe")}
            className="hover:text-yellow-300 btn"
          >
            Describe
          </button>
          <button
            onClick={() => setActiveComponent("evolution")}
            className="hover:text-yellow-300 btn"
          >
            Evolution
          </button>
          <button
            onClick={() => setActiveComponent("place")}
            className="hover:text-yellow-300 btn"
          >
            Place
          </button>
          <button
            onClick={() => setActiveComponent("move")}
            className="hover:text-yellow-300 btn"
          >
            Move
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Details;
