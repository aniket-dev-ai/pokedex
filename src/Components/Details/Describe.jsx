// src/Details/Describe.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const Describe = ({ pokemonData }) => {
  // State variables to hold Pokémon strengths, weaknesses, resistances, vulnerabilities, and evolution chain
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [resistances, setResistances] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonData) {
        const types = pokemonData.types.map((type) => type.type.name);

        try {
          // Fetch type effectiveness data for each Pokémon type
          const typeResponses = await Promise.all(
            types.map((type) =>
              axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            )
          );

          // Extract strengths, weaknesses, resistances, and vulnerabilities from the fetched data
          const fetchedStrengths = typeResponses.flatMap((response) =>
            response.data.damage_relations.double_damage_to.map(
              (type) => type.name
            )
          );
          const fetchedWeaknesses = typeResponses.flatMap((response) =>
            response.data.damage_relations.double_damage_from.map(
              (type) => type.name
            )
          );
          const fetchedResistances = typeResponses.flatMap((response) =>
            response.data.damage_relations.no_damage_from.map(
              (type) => type.name
            )
          );
          const fetchedVulnerabilities = typeResponses.flatMap((response) =>
            response.data.damage_relations.half_damage_from.map(
              (type) => type.name
            )
          );

          // Update state with unique values
          setStrengths([...new Set(fetchedStrengths)]);
          setWeaknesses([...new Set(fetchedWeaknesses)]);
          setResistances([...new Set(fetchedResistances)]);
          setVulnerabilities([...new Set(fetchedVulnerabilities)]);

          // Fetch evolution data
          const speciesResponse = await axios.get(pokemonData.species.url);
          const evolutionResponse = await axios.get(
            speciesResponse.data.evolution_chain.url
          );
          setEvolutionChain(getAllEvolutions(evolutionResponse.data.chain));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchPokemonDetails();
  }, [pokemonData]);

  // Function to recursively collect all evolutions from the evolution chain
  const getAllEvolutions = (chain) => {
    const evolutions = [chain.species.name]; // Start with the initial species

    // Recursively collect evolutions
    const collectEvolutions = (currentChain) => {
      if (currentChain.evolves_to.length > 0) {
        currentChain.evolves_to.forEach((evolution) => {
          evolutions.push(evolution.species.name);
          collectEvolutions(evolution); // Recursive call for further evolutions
        });
      }
    };

    collectEvolutions(chain);
    return evolutions;
  };

  // Render a message if no Pokémon data is available
  if (!pokemonData) return <div>No Pokémon data available.</div>;

  // Destructure necessary properties from pokemonData
  const { name, stats, types, sprites } = pokemonData;

  return (
    <div className="p-6 sm:p-12 w-full mx-auto text-white flex flex-col items-center justify-around relative">
      {/* Top Section */}
      <div className="w-full p-5 sm:p-16 flex justify-center items-center mb-2 gap-20 max-sm:flex-col">
        {/* Left: Type Section */}
        <div className="max-xsm:w-full max-sm:w-3/4 w-max text-left sm:text-xl bg-white p-4 rounded-xl border border-white backdrop-blur-sm bg-opacity-10 font-semibold sm:mr-8">
          <p>
            TYPE:{" "}
            {types
              .map((type) => type.type.name)
              .join(", ")
              .toUpperCase()}
          </p>
          <p className="uppercase">
            EVOLUTION: {resistances.join(", ") || "Achievable"}
          </p>{" "}
          {/* Dynamic evolution count */}
        </div>

        {/* Middle: Image and Name */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <img
              src={sprites.other["official-artwork"].front_default}
              alt={name}
              className="w-48 object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-yellow-400 absolute"></div>
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-yellow-400 absolute animate-spin-slow"></div>
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-yellow-400 absolute animate-spin-slow-reverse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex justify-between px-4 gap-4 max-sm:flex-col mt-20">
        {/* Left: Stats Section */}
        <div className="w-full sm:w-1/3 space-y-2">
          <h4 className="font-bold mb-2">Stats</h4>
          {stats.map((stat) => (
            <div key={stat.stat.name} className="flex items-center space-x-2">
              <span className="w-max">
                {stat.stat.name.toUpperCase()}: {stat.base_stat}
              </span>
              <div className="w-[150%] bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${stat.base_stat}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Strength and Weaknesses Section */}
        <div className="w-full sm:w-1/3 text-sm">
          <div className="border flex flex-col gap-4 p-4 rounded-md mb-4">
            <h4 className="font-bold mb-2">Strengths</h4>
            <p>{strengths.join(", ") || "N/A"}</p>
            <h4 className="font-bold mb-2">Weaknesses</h4>
            <p>{weaknesses.join(", ") || "N/A"}</p>
            <h4 className="font-bold mb-2">Resistant</h4>
            <p>{resistances.join(", ") || "N/A"}</p>
            <h4 className="font-bold mb-2">Vulnerable</h4>
            <p>{vulnerabilities.join(", ") || "N/A"}</p>
          </div>
          <button className="border border-yellow-400 text-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-gray-900">
            ADD POKÉMON
          </button>
        </div>
      </div>
    </div>
  );
};

export default Describe;
