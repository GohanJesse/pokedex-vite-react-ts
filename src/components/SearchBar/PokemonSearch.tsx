import { useState, useEffect } from 'react';
import Styles from './PokemonSearch.module.css';

type PokemonSearchProps = {
  onSearch: (name: string) => void;
};

export default function PokemonSearch({ onSearch }: PokemonSearchProps) {


  const [searchName, setSearchName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  useEffect(() => {
    onSearch(searchName)
  }, [searchName, onSearch]);


  return (
    <div className={Styles.searchBar}>
      <input 
        className={Styles.inputSearch} 
        placeholder="Recherchez votre Pokémon" 
        type="text"
        value={searchName}
        onChange={handleInputChange}
      />
      <div className={Styles.startSearch}>
        <img src="loupe.png" alt="Rechercher" />
      </div>
    </div>
  )
}
