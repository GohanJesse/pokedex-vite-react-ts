import { Pokemon } from "../models/PokemonTypes";
import { PokemonSpecies } from "../models/PokemonTypes";
import { EvolutionChain } from "../models/PokemonTypes";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  try {
    const limit = 151;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des données: ${response.statusText}`
      );
    }
    const data: { results: { url: string }[] } = await response.json();
    const pokemonPromises = data.results.map(async (pokemon) => {
      try {
        const pokemonData = await fetch(pokemon.url);
        if (!pokemonData.ok) {
          throw new Error(
            `Erreur lors de la récupération des données pour l'URL ${pokemon.url}: ${pokemonData.statusText}`
          );
        }
        const pokemonJson = await pokemonData.json();
        pokemonJson.name = capitalizeFirstLetter(pokemonJson.name);
        return pokemonJson;
      } catch (error) {
        console.error("Erreur lors de la récupération d'un Pokémon:", error);
      }
    });

    return (await Promise.all(pokemonPromises)).filter(
      (pokemon) => pokemon !== null
    );
  } catch (error) {
    console.error("fetchAllPokemons:", error);
    throw new Error(
      `Problème lors du chargement de tous les Pokémons: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des données pour ${name}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchPokemonByName:", error);
    throw new Error(
      `Problème lors du chargement du Pokémon nommé ${name}: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des données pour l'ID ${id}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchPokemonById:", error);
    throw new Error(
      `Problème lors du chargement du Pokémon avec l'ID ${id}: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};

export const fetchPokemonSpecies = async (
  url: string
): Promise<PokemonSpecies> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des données pour l'espèce Pokémon: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchPokemonSpecies:", error);
    throw new Error(
      `Problème lors du chargement des données de l'espèce Pokémon: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};

export const fetchPokemonEvolutionChain = async (
  url: string
): Promise<EvolutionChain> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération de la chaîne d'évolution: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchPokemonEvolutionChain:", error);
    throw new Error(
      `Problème lors du chargement de la chaîne d'évolution Pokémon: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};
