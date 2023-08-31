import Styles from './PokemonCard.module.css';
import { Link } from 'react-router-dom';

type PokemonCardProps = {
  image: string;
  name: string;
  number: number;
  type: string;
};

export default function PokemonCard({ image, name, number, type }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${number}`} className={Styles.pokemonCard}>
      <img className={Styles.imgCardGallery} src={image} alt={name} />
      <p className={Styles.numberPokemonCard}>#{number}</p>
      <h3 className={Styles.namePokemonCard}>{name}</h3>
      <p>{type}</p>
    </Link>
  )
}
