import { Pokemon, EvolutionChain, PokemonStat } from '../../models/PokemonTypes';
import { PokemonTypeColors } from '../../models/PokemonTypes';
import { PokemonSpecies } from '../../models/PokemonTypes';
import { EvolutionDetail } from '../../models/PokemonTypes';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Styles from './PokemonDetails.module.scss';


type PokemonDetailsProps = {
  pokemon: Pokemon;
  speciesDetails?: PokemonSpecies | null;
  evolutionChain?: EvolutionChain | null;
  onClose: () => void;
  isOpen: boolean;
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

const statColors: { [key: string]: string } = {
  'HP': '#DF2140',
  'ATK': '#FF994D',
  'DEF': '#eecd3d',
  'Spa': '#85DDFF',
  'SpD': '#96da83',
  'SPD': '#FB94A8',
  'TOT': '#7195DC'
};




export default function PokemonDetails({ pokemon, speciesDetails, evolutionChain, onClose, isOpen }: PokemonDetailsProps) {

  const defaultFlavorTextEntry = speciesDetails?.flavor_text_entries[0];
  const description = defaultFlavorTextEntry ? defaultFlavorTextEntry.flavor_text.replace(/\f|\n/g, ' ') : '';
  const evolutionList = evolutionChain ? getEvolutionChain(evolutionChain.chain) : [];
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });


  const handleClose = () => {
    onClose();
  };

  const desktopAnimation = {
    initial: { x: '0' },
    animate: { x: 0 },
    exit: { x: '0' },
    transition: { duration: 0 },
    delay: 1
  };

  const mobileAnimation = {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { duration: 0.5 }
  };

  const animationProps = isDesktop ? desktopAnimation : mobileAnimation;



  return (
    <motion.div
      className={`${Styles.modalDetails} flex column`}
      style={{
        backgroundColor: isDesktop ? 'transparent' : PokemonTypeColors[pokemon.types[0].type.name],
        zIndex: isOpen ? 2 : 3,
      }}
      {...animationProps}
    >
      {!isDesktop && (
        <div className={`${Styles.starReturn} flexCenter`} onClick={handleClose}>
          <img className={Styles.crossClose} src="/croix.png" alt="Fermer" />
        </div>
      )}
      <div className={`${Styles.cardPokemonDetails} flex column`}>
        <img className={Styles.imagePokemonDetails} src={getPokemonAnimatedImageUrl(pokemon.id)} alt={pokemon.name} />
        <span className={Styles.numberPokemon}>N°{pokemon.id}</span>
        <h2 className={Styles.pokemonCardName}>{pokemon.name}</h2>
        <div className={`${Styles.linePokemonType} flex`}>
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
        <h4 className={Styles.titleDescription}>Entrée Pokédex</h4>
        <span className={Styles.descriptionPokemon}>{description}</span>
        <div className={`${Styles.linePhysic} flexCenter`}>
          <div className={`${Styles.pokemonHeight} flexCenter column`}>
            <h4>Taille</h4>
            <div className={Styles.physicPoke}>{pokemon.height / 10}</div>
          </div>
          <div className={`${Styles.pokemonWeight} flexCenter column`}>
            <h4>Poids</h4>
            <div className={Styles.physicPoke}>{pokemon.weight / 10}</div>
          </div>
        </div>
        <div className={`${Styles.lineCapacity} flexCenter column`}>
          <h4>Capacités</h4>
          <div className={`${Styles.containerCapacity} flex`}>
            {pokemon.abilities.map(ability => (
              <div key={ability.ability.name}>
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
        <h4>Statistiques</h4>
        <div className={`${Styles.rowStat} flexCenter`}>
          {pokemon.stats.map((stat: PokemonStat) => (
            <div key={stat.stat.name} className={`${Styles.pokemonStatContainer} flex column`} >
              <div className={`${Styles.pokemonStatName} flexCenter`} style={{ backgroundColor: statColors[formatStatName(stat.stat.name)] }}>{formatStatName(stat.stat.name)}</div>
              <h5 className={Styles.pokemonStat} >{stat.base_stat}</h5>
            </div>
          ))}
          <div className={`${Styles.pokemonStatContainerTotal} flex column`}>
            <div className={`${Styles.pokemonStatNameTotal} flexCenter`}>TOT</div>
            <h5 className={Styles.pokemonStat}>{getTotalStats(pokemon.stats)}</h5>
          </div>
        </div>
        <div className={`${Styles.evolutionContainer} flexCenter column`}>
          <h4>Évolution</h4>
          <div className={`${Styles.evolutionBloc} flexCenter`}>
            {evolutionList.map((evolution, index) => (
              <div className={`${Styles.levelToBloc} flex`} key={evolution.id}>
                {index > 0 && <span className={Styles.levelToSpan}>Niv.{evolution.minLevel}</span>}
                <img className={Styles.pokemonEvolutionChainImg} src={evolution.image} alt={evolution.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}



