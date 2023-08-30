import Styles from './DetailsPage.module.css';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';

const DetailsPage = () => {
  return (
    <div className={Styles.modalDetailsPokemon}>
      <PokemonDetails />
    </div>
  );
};

export default DetailsPage;