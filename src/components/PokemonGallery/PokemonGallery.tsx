import { useEffect, useState } from 'react';
import Styles from './PokemonGallery.module.css';
import { Pokemon } from '../../models/PokemonTypes';
import PokemonCard from '../PokemonCard/PokemonCard';

type PokemonGalleryProps = {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
};

export default function PokemonGallery({ pokemons, onSelect }: PokemonGalleryProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pokemons.length > 0) {
      setIsLoading(false);
    }
  }, [pokemons]);

  return (
    <div className={Styles.pokemonGallery}>
      {isLoading ? (
        <div className={Styles.loader}>
          <img src="pokeball.png" alt="Loading..." />
        </div>
      ) : (
        <div className={Styles.gridContainer}>
          {pokemons.map(pokemon => (
            <PokemonCard 
              key={pokemon.name}
              image={pokemon.sprites.front_default}
              name={pokemon.name}
              number={pokemon.id}
              types={pokemon.types.map(t => t.type.name)}
              onClick={() => onSelect(pokemon)}
            />
          ))}
        </div>
      )}
    </div>
  );
}


