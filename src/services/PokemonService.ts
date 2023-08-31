import { Pokemon } from '../models/PokemonTypes';

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  const limit = 151;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data: { results: { url: string }[] } = await response.json();
  const pokemonPromises = data.results.map(async (pokemon) => {
    const pokemonData = await fetch(pokemon.url);
    return pokemonData.json();
  });
  console.log(data.results);
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