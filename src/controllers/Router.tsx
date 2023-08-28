import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonGallery from '../view/compenents/PokemonDetails/PokemonDetails.tsx';
import PokemonDetails from '../view/compenents/PokemonGallery/PokemonGallery.tsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonGallery />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

