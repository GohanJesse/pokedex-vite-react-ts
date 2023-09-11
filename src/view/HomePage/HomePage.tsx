import { useState, useEffect } from 'react';
import Styles from './HomePage.module.css';
import { Pokemon } from '../../models/PokemonTypes';
import { fetchAllPokemons } from '../../services/PokemonService';
import PokemonGallery from '../../components/PokemonGallery/PokemonGallery';
import SearchBar from '../../components/SearchBar/PokemonSearch';

const HomePage = () => {

  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (name: string) => {
    setSearchTerm(name);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllPokemons();
      setAllPokemons(data);
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = allPokemons.filter(pokemon => pokemon.name.includes(searchTerm));
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(allPokemons);
    }
  }, [searchTerm, allPokemons]);
  

  return (
    <div className={Styles.pokedex}>
      <SearchBar onSearch={handleSearch} />
      <PokemonGallery pokemons={filteredPokemons}/>
    </div>
  );
};

export default HomePage;

