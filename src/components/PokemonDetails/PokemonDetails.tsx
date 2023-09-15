import { useNavigate } from 'react-router-dom';
import Styles from './PokemonDetails.module.css';
import { Pokemon, EvolutionChain, PokemonStat } from '../../models/PokemonTypes';
import { PokemonTypeColors } from '../../models/PokemonTypes';
import { PokemonSpecies } from '../../models/PokemonTypes';
import { EvolutionDetail } from '../../models/PokemonTypes';


type PokemonDetailsProps = {
  pokemon: Pokemon;
  speciesDetails: PokemonSpecies;
  evolutionChain: EvolutionChain | null;
};

const getPokemonImageUrl = (pokemonName: string): string => {
  return `https://pokeapi.co/media/sprites/pokemon/${pokemonName}.png`;
};

const getEvolutionChain = (chain: EvolutionDetail): { name: string; image: string }[] => {
  const evolutions: { name: string; image: string }[] = [{ name: chain.species.name, image: getPokemonImageUrl(chain.species.name) }];
  if (chain.evolves_to.length) {
    evolutions.push(...getEvolutionChain(chain.evolves_to[0]));
  }
  return evolutions;
};

export default function PokemonDetails({ pokemon, speciesDetails, evolutionChain }: PokemonDetailsProps) {
  const navigate = useNavigate();
  const defaultFlavorTextEntry = speciesDetails?.flavor_text_entries[0];
  const description = defaultFlavorTextEntry ? defaultFlavorTextEntry.flavor_text.replace(/\f|\n/g, ' ') : '';
  const evolutionList = evolutionChain ? getEvolutionChain(evolutionChain.chain) : [];

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={Styles.modalDetails}>
      <div className={Styles.starReturn} onClick={handleClose}>
        <img className={Styles.crossClose} src="/croix.png" alt="Fermer" />
      </div>
      <div className={Styles.cardPokemonDetails}>
        <img className={Styles.imagePokemonDetails} src={pokemon.sprites.front_default} alt={pokemon.name} />
        <span className={Styles.numberPokemon}>N°{pokemon.id}</span>
        <h2 className={Styles.pokemonCardName}>{pokemon.name}</h2>
        <div className={Styles.linePokemonType}>
          {pokemon.types.map(type => (
            <div
              key={type.type.name}
              className={Styles.typeContainer}
              style={{ backgroundColor: PokemonTypeColors[type.type.name] }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <h4>Entrée Pokédex</h4>
        <span className={Styles.descriptionPokemon}>{description}</span>
        <div className={Styles.linePhysic}>
          <div className={Styles.pokemonHeight}>
            <h4>taille</h4>
            <div className={Styles.physicPoke}>{pokemon.height / 10}</div>
          </div>
          <div className={Styles.pokemonWeight}>
            <h4>Poids</h4>
            <div className={Styles.physicPoke}>{pokemon.weight / 10}</div>
          </div>
        </div>
        <div className={Styles.lineCapacity}>
          <h4>Capacités</h4>
          <div className={Styles.containerCapacity}>
            {pokemon.abilities.map(ability => (
              <div key={ability.ability.name}>
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
        <h4>Statistiques</h4>
        <div className={Styles.rowCenter}>
          {pokemon.stats.map((stat: PokemonStat) => (
            <div key={stat.stat.name} className={Styles.pokemonStatContainer}>
              <div className={Styles.pokemonStatName}>{stat.stat.name}</div>
              <div className={Styles.pokemonStat}>{stat.base_stat}</div>
            </div>
          ))}
        </div>
        <div className={Styles.evolutionContainer}>
          <h4>Évolution</h4>
          <div className={Styles.rowCenter}>
            {evolutionList.map((evolution, index) => (
              <div key={evolution.name}>
                {index > 0 && <span> - </span>}
                <img src={evolution.image} alt={evolution.name} />
                <span>{evolution.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
