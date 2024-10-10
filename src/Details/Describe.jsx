import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Describe = ({ pokemonData }) => {
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [resistances, setResistances] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonData) {
        const types = pokemonData.types.map(type => type.type.name);
        
        try {
          // Fetch type effectiveness data
          const typeResponse = await Promise.all(
            types.map(type => axios.get(`https://pokeapi.co/api/v2/type/${type}`))
          );

          // Calculate strengths and weaknesses based on type data
          const fetchedStrengths = typeResponse.flatMap(response => 
            response.data.damage_relations.double_damage_to.map(type => type.name)
          );
          const fetchedWeaknesses = typeResponse.flatMap(response => 
            response.data.damage_relations.double_damage_from.map(type => type.name)
          );
          const fetchedResistances = typeResponse.flatMap(response => 
            response.data.damage_relations.no_damage_from.map(type => type.name)
          );
          const fetchedVulnerabilities = typeResponse.flatMap(response => 
            response.data.damage_relations.half_damage_from.map(type => type.name)
          );

          // Set states
          setStrengths([...new Set(fetchedStrengths)]);
          setWeaknesses([...new Set(fetchedWeaknesses)]);
          setResistances([...new Set(fetchedResistances)]);
          setVulnerabilities([...new Set(fetchedVulnerabilities)]);
          
          // Fetch evolution data
          const speciesResponse = await axios.get(pokemonData.species.url);
          const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
          setEvolutionChain(getAllEvolutions(evolutionResponse.data.chain));
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchPokemonDetails();
  }, [pokemonData]);

  const getAllEvolutions = (chain) => {
    const evolutions = [];
    let currentChain = chain;

    // Collect the initial species
    evolutions.push(currentChain.species.name);

    // Recursively collect evolutions
    const collectEvolutions = (chain) => {
      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(evolution => {
          evolutions.push(evolution.species.name);
          collectEvolutions(evolution); // Recursive call for further evolutions
        });
      }
    };

    collectEvolutions(currentChain);
    return evolutions;
  };

  if (!pokemonData) return <div>No Pokémon data available.</div>;

  const {
    name,
    stats,
    types,
    sprites,
  } = pokemonData;

  return (
    <div className="p-12 h-[75vh] w-[88vw] mx-auto text-white flex flex-col items-center justify-around relative">
      
      {/* Top Section */}
      <div className="w-full p-16 flex justify-between items-start">
        
        {/* Left: Type Section */}
        <div className="text-left text-xl  bg-white p-4 rounded-xl border border-white backdrop-blur-sm bg-opacity-10 font-semibold ml-4">
          <p>TYPE: {types.map(type => type.type.name).join(', ').toUpperCase()}</p>
          <p className='uppercase'>EVOLUTION: {resistances.join(', ') || "Achievable" }</p> {/* Dynamic evolution count */}
        </div>

        {/* Middle: Image and Name */}
        <div className="flex flex-col items-center mr-[35vw]">
          <div className="relative">
            <img
              src={sprites.other['official-artwork'].front_default}
              alt={name}
              className="w-48 h-48 object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-2 border-yellow-400 absolute"></div>
              <div className="w-72 h-72 rounded-full border-2 border-yellow-400 absolute animate-spin-slow"></div>
              <div className="w-80 h-80 rounded-full border-2 border-yellow-400 absolute animate-spin-slow-reverse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex justify-between px-4">
        
        {/* Left: Stats Section */}
        <div className="w-1/3 space-y-2">
          <h4 className="font-bold mb-2">Stats</h4>
          {stats.map((stat) => (
            <div key={stat.stat.name} className="flex items-center space-x-2">
              <span className="w-20">{stat.stat.name.toUpperCase()}: {stat.base_stat}</span>
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
        <div className="w-1/3 text-sm">
          <div className="border flex flex-col gap-4 p-4 rounded-md mb-4">
            <h4 className="font-bold mb-2">Strengths</h4>
            <p>{strengths.join(', ') || 'N/A'}</p>
            <h4 className="font-bold mb-2">Weaknesses</h4>
            <p>{weaknesses.join(', ') || 'N/A'}</p>
            <h4 className="font-bold mb-2">Resistant</h4>
            <p>{resistances.join(', ') || 'N/A'}</p>
            <h4 className="font-bold mb-2">Vulnerable</h4>
            <p>{vulnerabilities.join(', ') || 'N/A'}</p>
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
