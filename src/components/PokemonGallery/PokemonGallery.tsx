import { useState, useEffect } from 'react';
import Styles from './PokemonGallery.module.css';
import { Pokemon } from '../../models/PokemonTypes';
import { fetchAllPokemons } from '../../services/PokemonService';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonGallery() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllPokemons();
      setPokemons(data);
    };

    fetchData();
  }, []);

  return (
    <div className={Styles.pokemonGallery}>
      {pokemons.map(pokemon => (
        <PokemonCard 
          key={pokemon.name}
          image={pokemon.sprites.front_default}
          name={pokemon.name}
          number={pokemon.id}
          type={pokemon.types[0].type.name}
        />
      ))}
    </div>
  )
}
