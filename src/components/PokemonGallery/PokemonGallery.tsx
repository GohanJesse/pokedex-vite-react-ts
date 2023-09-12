import { useEffect, useState } from 'react';
import Styles from './PokemonGallery.module.css';
import { Pokemon } from '../../models/PokemonTypes';
import PokemonCard from '../PokemonCard/PokemonCard';

type PokemonGalleryProps = {
  pokemons: Pokemon[];
};

export default function PokemonGallery({ pokemons }: PokemonGalleryProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pokemons.length > 0) {
      setIsLoading(false);
    }
  }, [pokemons]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        window.scrollTo(0, 0); 
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            />
          ))}
        </div>
      )}
    </div>
  );
}


