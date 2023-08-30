// import React from 'react'
import Styles from './PokemonCard.module.css';

type PokemonCardProps = {
  image: string;
  name: string;
  number: number;
  type: string;
};

export default function PokemonCard({ image, name, number, type }: PokemonCardProps) {
  return (
    <div className={Styles.pokemonCard}>
      <img className={Styles.imgCardGallery} src={image} alt={name} />
      <p className={Styles.numberPokemonCard}>#{number}</p>
      <h3 className={Styles.namePokemonCard}>{name}</h3>
      <p>{type}</p>
    </div>
  )
}
