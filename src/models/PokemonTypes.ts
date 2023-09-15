export interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: PokemonType } }[];
  sprites: {
    front_default: string;
    versions: {
      "generation-v": {
        "black-white": {
          front_default: string;
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  total_stats: number;
  species: {
    url: string;
  };
  evolutions?: EvolutionDetail[];
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain?: {
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface EvolutionChain {
  chain: EvolutionDetail;
}

export interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[];
  evolution_details: {
    min_level: number;
  }[];
}

export type PokemonType = 'normal' | 'fighting' | 'flying' | 
'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 
'steel' | 'fire' | 'water' | 'grass' | 'electric' | 
'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'unknown' | 'shadow'; 

export const PokemonTypeColors: Record<PokemonType, string> = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  unknown: '#B6B6B6',
  shadow: '#705898'
};

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
  slot: number;
  ability: Ability;
}

export interface Ability {
  name: string;
}

export interface PokemonStat {
  name: string;
  base_stat: number;
  effort: Stat;
  stat: Stat;
}

export interface Stat {
  name: string;
}