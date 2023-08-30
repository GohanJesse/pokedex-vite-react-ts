// import React from 'react'
import Styles from './PokemonSearch.module.css';

export default function PokemonSearch() {
  return (
    <div className={Styles.searchBar}>
      <input className={Styles.inputSearch} placeholder="Recherchez votre Pokémon" type="text" />
      <div className={Styles.startSearch}>

      </div>
    </div>
  )
}
