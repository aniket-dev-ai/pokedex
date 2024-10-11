// src/Components/Cards.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Loader from "./loader";

const Cards = () => {
  const [allPokemonData, setAllPokemonData] = useState([]); // Store all Pokémon data
  const [displayedPokemon, setDisplayedPokemon] = useState([]); // Store randomly selected Pokémon to display
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [suggestions, setSuggestions] = useState([]); // Suggestions for dropdown
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize navigation

  // Function to fetch all Pokémon data
  const fetchAllPokemonData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=25"
      ); // Fetch initial set of Pokémon
      const detailedData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return {
            id: pokemonDetail.data.id,
            name: pokemonDetail.data.name,
            image:
              pokemonDetail.data.sprites.other["official-artwork"]
                .front_default,
            type: pokemonDetail.data.types.map((t) => t.type.name).join(", "),
          };
        })
      );
      setAllPokemonData(detailedData); // Store all Pokémon data
      setDisplayedPokemon(getRandomPokemon(detailedData, 20)); // Randomly select 20 Pokémon for display
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setError("Failed to load Pokémon data."); // Set a meaningful error message
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to get random Pokémon from the array
  const getRandomPokemon = (pokemonArray, count) => {
    const shuffled = pokemonArray.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, count); // Return the first 'count' elements
  };

  // Function to handle search query changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);

    // Check for suggestions based on search query
    if (query.length > 0) {
      const filteredSuggestions = allPokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions); // Update suggestions based on query
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Effect to fetch Pokémon data when component mounts
  useEffect(() => {
    fetchAllPokemonData();
  }, []);

  // Function to handle suggestion click
  const handleSuggestionClick = (pokemon) => {
    // Instead of navigating to details, filter the displayed Pokémon
    setDisplayedPokemon([pokemon]); // Update displayed Pokémon to show the clicked Pokémon
    setSearchQuery(pokemon.name); // Set search input to clicked Pokémon name
    setSuggestions([]); // Clear suggestions
  };

  // Render loading state
  // if (!loading)
  //   return (

  //   );

  return (
    <div className="p-4 bg-black min-h-screen scrollbar-hidden">
      {error && (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      )}
      {/* Error message */}
      {/* Search Input */}
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="mb-4 p-2 border rounded w-full bg-transparent outline-none text-white"
        />
      </div>
      {/* Dropdown for suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute w-2/4 bg-gray-900 text-white border rounded shadow-lg z-[1]">
          {suggestions.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => handleSuggestionClick(pokemon)}
              className="p-2 hover:bg-gray-950 cursor-pointer"
            >
              {pokemon.name}
            </div>
          ))}
        </div>
      )}
      {/* Pokémon Cards Display */}
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayedPokemon.length > 0 &&
          displayedPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            >
              <Card
                name={pokemon.name}
                image={pokemon.image}
                type={pokemon.type}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cards;
