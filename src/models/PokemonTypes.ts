export interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: PokemonType } }[];
  sprites: { front_default: string };
  pokedex_entry: string; 
  height: number; 
  weight: number; 
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  total_stats: number; 
  evolutions: {
    level: number;
    evolves_to: string; 
  }[];
}

export type PokemonType = 'normal' | 'fighting' | 'flying' | 
'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 
'steel' | 'fire' | 'water' | 'grass' | 'electric' | 
'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'unknown' | 'shadow'; 


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