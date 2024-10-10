import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Place = ({ pokemonId }) => {
  const [habitats, setHabitats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabitatData = async () => {
      try {
        // Fetch Pokémon species data
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const habitatUrl = speciesResponse.data.habitat.url;

        // Fetch habitat data
        const habitatResponse = await axios.get(habitatUrl);
        setHabitats(habitatResponse.data.names);
      } catch (error) {
        console.error('Error fetching habitat data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitatData();
  }, [pokemonId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (habitats.length === 0) {
    return <div className="text-center text-gray-500">No habitat data found</div>;
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-8xl mb-[15vh] font-bold">Habitats</h2>
      <ul className=" flex flex-col gap-8 pl-5">
        {habitats.map((habitat, index) => (
          <li  key={index} className=" text-4xl">{habitat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Place;
