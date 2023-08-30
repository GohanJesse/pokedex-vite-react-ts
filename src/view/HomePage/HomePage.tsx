import Styles from './HomePage.module.css';
import PokemonGallery from '../../components/PokemonGallery/PokemonGallery';
import SearchBar from '../../components/SearchBar.tsx/PokemonSearch';

const HomePage = () => {
  return (
    <div className={Styles.pokedex}>
      <SearchBar />
      <PokemonGallery />
    </div>
  );
};

export default HomePage;