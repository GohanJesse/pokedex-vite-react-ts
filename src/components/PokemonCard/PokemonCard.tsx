// import Styles from './PokemonCard.module.css';
// import { Link } from 'react-router-dom';

// type PokemonCardProps = {
//   image: string;
//   name: string;
//   number: number;
//   types: string[];
// };

// export default function PokemonCard({ image, name, number, types }: PokemonCardProps) {
//   return (
//     <Link to={`/pokemon/${number}`} className={Styles.pokemonCard}>
//       <img className={Styles.imgCardGallery} src={image} alt={name} />
//       <p className={Styles.numberPokemonCard}>N°{number}</p>
//       <h3 className={Styles.namePokemonCard}>{name}</h3>
//       <div className={Styles.typeContainer}>
//         {types.map((type, index) => (
//           <span 
//             key={index}
//             className={Styles.type}>{type}</span>
//         ))}
//       </div>
//     </Link>
//   )
// }


import Styles from './PokemonCard.module.css';
import { Link } from 'react-router-dom';
import { PokemonType, PokemonTypeColors } from '../../models/PokemonTypes';

type PokemonCardProps = {
  image: string;
  name: string;
  number: number;
  types: PokemonType[];
};

export default function PokemonCard({ image, name, number, types }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${number}`} className={Styles.pokemonCard}>
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
    </Link>
  );
}

