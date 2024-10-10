import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Move = ({ pokemonId }) => {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchMoveData = async () => {
      try {
        // Fetch Pokémon data to get move details
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setMoves(response.data.moves);
      } catch (error) {
        console.error('Error fetching move data:', error);
        setError('Failed to load move data.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchMoveData();
  }, [pokemonId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Display error message
  }

  if (moves.length === 0) {
    return <div className="text-center text-gray-500">No moves found</div>;
  }

  return (
    <div className="p-4 h-[73vh] overflow-y-auto scrollbar-hidden">
      <h2 className="text-2xl font-bold text-center">Moves</h2>
      <ul className="list-disc pl-5 w-full h-[80vh]  p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {moves.map((moveData, index) => (
          <li key={index} className="text-lg bg-gray-500 text-yellow-900 font-extrabold m-2 p-4 h-16 text-center rounded shadow">
            {moveData.move.name}
            {/* Add more details about the move when needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Move;
