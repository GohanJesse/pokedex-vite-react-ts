import { useState, useEffect } from 'react';
import { Pokemon, EvolutionChain } from '../../models/PokemonTypes';
import { useParams } from 'react-router-dom';
import { fetchPokemonById, fetchPokemonSpecies, fetchPokemonEvolutionChain } from '../../services/PokemonService';
import { PokemonSpecies } from '../../models/PokemonTypes';
import { PokemonTypeColors } from '../../models/PokemonTypes';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import Styles from './DetailsPage.module.css';

export default function DetailsPage() {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [speciesDetails, setSpeciesDetails] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === 'undefined') {
        console.error("ID is undefined");
        return;
      }
      const data = await fetchPokemonById(id);
      setPokemon(data);

      if (data && data.species && data.species.url) {
        const speciesData = await fetchPokemonSpecies(data.species.url);
        setSpeciesDetails(speciesData);

        if (speciesData && speciesData.evolution_chain && speciesData.evolution_chain.url) {
          const evolutionData = await fetchPokemonEvolutionChain(speciesData.evolution_chain.url);
          setEvolutionChain(evolutionData);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!pokemon || !speciesDetails) return <div>Loading...</div>;

  return (
    <div 
      className={Styles.modalDetailsPokemon} 
      style={{ backgroundColor: pokemon.types[0] ? PokemonTypeColors[pokemon.types[0].type.name] : 'defaultColor' }}
    >
      <PokemonDetails pokemon={pokemon} speciesDetails={speciesDetails} evolutionChain={evolutionChain} />
    </div>
  );
}
