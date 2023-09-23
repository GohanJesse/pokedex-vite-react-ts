import { useState, useEffect, useRef } from 'react';
import { Pokemon, PokemonSpecies, EvolutionChain } from '../../models/PokemonTypes';
import { fetchAllPokemons, fetchPokemonSpecies, fetchPokemonEvolutionChain } from '../../services/PokemonService';
import PokemonGallery from '../../components/PokemonGallery/PokemonGallery';
import SearchBar from '../../components/SearchBar/PokemonSearch';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import PokemonPlaceholder from '../../components/PokemonPlaceholder/PokemonPlaceholder';
import Styles from './HomePage.module.css';

const HomePage = () => {

  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [speciesDetails, setSpeciesDetails] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);

  const handleSearch = (name: string) => {
    setSearchTerm(name);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllPokemons();
      setAllPokemons(data);

      if (selectedPokemon && selectedPokemon.species && selectedPokemon.species.url) {
        const speciesData = await fetchPokemonSpecies(selectedPokemon.species.url);
        setSpeciesDetails(speciesData);

        if (speciesData && speciesData.evolution_chain && speciesData.evolution_chain.url) {
          const evolutionData = await fetchPokemonEvolutionChain(speciesData.evolution_chain.url);
          setEvolutionChain(evolutionData);
        }
      }
    };

    fetchData();
  }, [selectedPokemon]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allPokemons.filter(pokemon => pokemon.name.includes(searchTerm));
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(allPokemons);
    }
  }, [searchTerm, allPokemons]);

  useEffect(() => {
    const handleScroll = () => {
      const leftColumn = leftColumnRef.current;
      if (leftColumn) {
        const { scrollHeight, scrollTop, clientHeight } = leftColumn;
        if (scrollTop + clientHeight >= scrollHeight) {
          leftColumn.scrollTo(0, 0);
        }
      }
    };

    const leftColumn = leftColumnRef.current;
    if (leftColumn) {
      leftColumn.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (leftColumn) {
        leftColumn.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };


  return (
    <div className={Styles.pokedex}>
      <img className={Styles.decoPokeball} src="pokeball.png" alt="Déco Pokeball" />
      <div className={Styles.contentWrapper}>
        <div ref={leftColumnRef} className={`${Styles.leftColumn} ${!selectedPokemon ? Styles.active : ''}`}>
          <SearchBar onSearch={handleSearch} />
          <PokemonGallery pokemons={filteredPokemons} onSelect={handlePokemonSelect} />
        </div>
        <div className={`${Styles.pokemonDetailsWrapper} ${selectedPokemon ? Styles.active : ''}`}>
          {selectedPokemon ? (
            <PokemonDetails
              pokemon={selectedPokemon}
              onClose={handleCloseDetails}
              speciesDetails={speciesDetails}
              evolutionChain={evolutionChain}
            />
          ) : (
            <PokemonPlaceholder className={Styles.pokemonPlaceholderHidden} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

