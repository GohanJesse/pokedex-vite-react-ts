import { Pokemon } from '../models/PokemonTypes';

export const fetchAllPokemons = async (limit: number = 151): Promise<Pokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data: { results: { url: string }[] } = await response.json();
  const pokemonPromises = data.results.map(async (pokemon) => {
    const pokemonData = await fetch(pokemon.url);
    return pokemonData.json();
  });
  console.log(data);
  return Promise.all(pokemonPromises);
};