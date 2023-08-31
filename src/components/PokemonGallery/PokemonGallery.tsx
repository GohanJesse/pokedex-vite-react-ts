import Styles from './PokemonGallery.module.css';
import { Pokemon } from '../../models/PokemonTypes';
import PokemonCard from '../PokemonCard/PokemonCard';

type PokemonGalleryProps = {
  pokemons: Pokemon[];
};

export default function PokemonGallery({ pokemons }: PokemonGalleryProps) {
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
