import { useState, useEffect } from 'react';
import { Pokemon } from '../../models/PokemonTypes';
import { useParams } from 'react-router-dom';
import { fetchPokemonById } from '../../services/PokemonService';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import Styles from './DetailsPage.module.css';

export default function DetailsPage() {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === 'undefined') {
        console.error("ID is undefined");
        return;
      }
      const data = await fetchPokemonById(id);
      setPokemon(data);
    };

    fetchData();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className={Styles.modalDetailsPokemon}>
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
}
