// src/Details/Details.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Describe from './Describe';
import Evolution from './Evolution';
import Place from './Place';
import Move from './Move';

const Details = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeComponent, setActiveComponent] = useState('describe');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setError('Failed to load Pokémon details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!pokemonDetails) return <div className="text-center text-gray-500">No Pokémon details found</div>;

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'describe':
        return <Describe pokemonData={pokemonDetails} />;
      case 'evolution':
        return <Evolution pokemonId={id} />;
      case 'place':
        return <Place pokemonId={id} />;
      case 'move':
        return <Move pokemonId={id} />;
      default:
        return <Describe pokemonData={pokemonDetails} />;
    }
  };

  return (
    <div className="p-4 min-h-[89vh] bg-black text-yellow-700  flex flex-col justify-between">
      <h1 className="text-4xl font-extrabold uppercase w-full text-center mb-4">{pokemonDetails.name}</h1>
      {renderActiveComponent()}
      <footer className="mt-4">
        <div className="flex h-[6vh] justify-around text-2xl font-bold ">
          <button onClick={() => setActiveComponent('describe')} className="hover:text-yellow-300 btn">Describe</button>
          <button onClick={() => setActiveComponent('evolution')} className="hover:text-yellow-300 btn">Evolution</button>
          <button onClick={() => setActiveComponent('place')} className="hover:text-yellow-300 btn">Place</button>
          <button onClick={() => setActiveComponent('move')} className="hover:text-yellow-300 btn">Move</button>
        </div>
      </footer>
    </div>
  );
};

export default Details;
