import Styles from './PokemonCard.module.css';
import { PokemonType, PokemonTypeColors } from '../../models/PokemonTypes';

type PokemonCardProps = {
  image: string;
  name: string;
  number: number;
  types: PokemonType[];
  onClick?: () => void;
};

export default function PokemonCard({ image, name, number, types, onClick }: PokemonCardProps) {
  return (
    <div className={Styles.pokemonCard} onClick={onClick}>
      <img className={Styles.imgCardGallery} src={image} alt={name} />
      <p className={Styles.numberPokemonCard}>N°{number}</p>
      <h3 className={Styles.namePokemonCard}>{name}</h3>
      <div className={Styles.typeContainer}>
        {types.map((type, index) => {
          const bgColor = PokemonTypeColors[type];
          return (
            <span 
              key={index}
              className={Styles.type}
              style={{ backgroundColor: bgColor }}
            >
              {type}
            </span>
          );
        })}
      </div>
    </div>
  );
}

