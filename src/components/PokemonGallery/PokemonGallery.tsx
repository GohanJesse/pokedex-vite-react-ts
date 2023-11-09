import { useEffect, useState, useRef } from 'react';
import { Pokemon } from '../../models/PokemonTypes';
import { motion } from 'framer-motion';
import PokemonCard from '../PokemonCard/PokemonCard';
import Styles from './PokemonGallery.module.scss';

type PokemonGalleryProps = {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function PokemonGallery({ pokemons, onSelect }: PokemonGalleryProps) {
  const [isLoading, setIsLoading] = useState(true);
  const leftColumnRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (pokemons.length > 0) {
      setIsLoading(false);
    }
  }, [pokemons]);

  useEffect(() => {
    const handleScroll = () => {
      const leftColumn = leftColumnRef.current;
      if (leftColumn) {
        const { scrollHeight, scrollTop, clientHeight } = leftColumn;
        if (scrollTop + clientHeight >= scrollHeight) {
          leftColumn.scrollTo(0, 0);
        }
      }
    };

    const leftColumn = leftColumnRef.current;
    if (leftColumn) {
      leftColumn.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (leftColumn) {
        leftColumn.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={`${Styles.pokemonGallery} flexCenter`}>
      {isLoading ? (
        <div className={`${Styles.loader} flexCenter`}>
          <img src="pokeball.png" alt="Loading..." />
        </div>
      ) : (
        <div ref={leftColumnRef} className={Styles.gridContainer}>
          {pokemons.map((pokemon, index) => (
            <motion.div
              key={pokemon.name}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <PokemonCard
                key={pokemon.name}
                image={pokemon.sprites.front_default}
                name={pokemon.name}
                number={pokemon.id}
                types={pokemon.types.map(t => t.type.name)}
                onClick={() => onSelect(pokemon)}
              />
            </motion.div>
          ))}
        </div>
      )
      }
    </div >
  );
}


