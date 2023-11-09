import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Styles from './PokemonSearch.module.scss';

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
    <motion.div
      className={`${Styles.searchBar} flex`}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        className={Styles.inputSearch}
        placeholder="Recherchez votre Pokémon"
        type="text"
        value={searchName}
        onChange={handleInputChange}
      />
      <div className={`${Styles.startSearch} flexCenter`}>
        <img src="loupe.png" alt="Rechercher" />
      </div>
    </motion.div>
  )
}
