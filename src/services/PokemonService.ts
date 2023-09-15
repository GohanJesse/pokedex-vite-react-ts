import { Pokemon } from '../models/PokemonTypes';
import { PokemonSpecies } from '../models/PokemonTypes';
import { EvolutionChain } from '../models/PokemonTypes';

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
const limit = 151;
const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
const data: { results: { url: string }[] } = await response.json();
const pokemonPromises = data.results.map(async (pokemon) => {
  const pokemonData = await fetch(pokemon.url);
  const pokemonJson = await pokemonData.json();
  pokemonJson.name = capitalizeFirstLetter(pokemonJson.name);
  return pokemonJson;
});
return Promise.all(pokemonPromises);
};


export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data;
};

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
};

export const fetchPokemonSpecies = async (url: string): Promise<PokemonSpecies> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchPokemonEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};