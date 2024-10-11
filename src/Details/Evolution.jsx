// src/Details/Evolution.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Loader from "../Components/loader";

const Evolution = ({ pokemonId }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        // Fetch species data to get the evolution chain URL
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        // Fetch evolution chain data
        const evolutionResponse = await axios.get(evolutionChainUrl);
        setEvolutionChain(evolutionResponse.data);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionData();
  }, [pokemonId]);

  // Recursively extract all evolutions from the evolution chain
  const extractEvolutions = (evolution) => {
    const evolutions = [];
    if (evolution.species) {
      evolutions.push(evolution.species.name);
    }
    if (evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach((nextEvolution) => {
        evolutions.push(...extractEvolutions(nextEvolution));
      });
    }
    return evolutions;
  };

  // Fetch the image of a Pokémon by its name
  const fetchPokemonImage = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      return response.data.sprites.other["official-artwork"].front_default;
    } catch (error) {
      console.error("Error fetching Pokémon image:", error);
      return null; // Return null if there's an error
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (evolutionChain) {
        const evolutions = extractEvolutions(evolutionChain.chain);

        // Fetch images for all evolutions
        const promises = evolutions.map(async (name) => {
          const imageUrl = await fetchPokemonImage(name);
          return { name, imageUrl };
        });

        // Wait for all image fetching to complete
        const resolvedImages = await Promise.all(promises);
        setImages(resolvedImages);
      }
    };

    fetchImages();
  }, [evolutionChain]);

  // Handle navigation to the selected Pokémon's details
  const handleCardClick = (name) => {
    navigate(`/pokemon/${name}`);
  };

  // Render loading state or error message if no data found
  if (loading)
    return (
      <div className="w-full h-3/4 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (!evolutionChain)
    return (
      <div className="text-center text-gray-500">No evolution data found</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center mb-[4vh] font-bold">
        Evolution Chain
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(({ name, imageUrl }, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(name)}
            className="cursor-pointer"
          >
            <Card
              name={name}
              image={imageUrl}
              type=""
              className="border border-yellow-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evolution;
