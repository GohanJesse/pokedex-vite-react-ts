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

const getPokemonImageUrl = (pokemonId: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
};

const getPokemonAnimatedImageUrl = (pokemonId: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;
};


const getEvolutionChain = (chain: EvolutionDetail): { id: number; name: string; image: string; minLevel: number | null }[] => {
  const evolutions: { id: number; name: string; image: string; minLevel: number | null }[] = [{ id: Number(chain.species.url.split('/')[6]), name: chain.species.name, image: getPokemonImageUrl(chain.species.url.split('/')[6]), minLevel: null }];
  if (chain.evolves_to.length) {
    const nextEvolution = getEvolutionChain(chain.evolves_to[0]);
    nextEvolution[0].minLevel = chain.evolves_to[0].evolution_details[0].min_level;
    evolutions.push(...nextEvolution);
  }
  return evolutions;
};

const getTotalStats = (stats: PokemonStat[]): number => {
  return stats.reduce((total, stat) => total + stat.base_stat, 0);
};

const formatStatName = (name: string): string => {
  const abbreviations: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'Spa',
    'special-defense': 'SpD',
    'speed': 'SPD'
  };
  return abbreviations[name] || name.toUpperCase();
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
      <img className={Styles.imagePokemonDetails} src={getPokemonAnimatedImageUrl(pokemon.id)} alt={pokemon.name} />
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
              <div className={Styles.pokemonStatName}>{formatStatName(stat.stat.name)}</div>
              <div className={Styles.pokemonStat}>{stat.base_stat}</div>
            </div>
          ))}
          <div className={Styles.pokemonStatContainer}>
            <div className={Styles.pokemonStatName}>Total</div>
            <div className={Styles.pokemonStat}>{getTotalStats(pokemon.stats)}</div>
          </div>
        </div>
        <div className={Styles.evolutionContainer}>
          <h4>Évolution</h4>
          <div className={Styles.rowCenter}>
            {evolutionList.map((evolution, index) => (
              <div key={evolution.id}>
                {index > 0 && <span>Niv.{evolution.minLevel}</span>}
                <img src={evolution.image} alt={evolution.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



