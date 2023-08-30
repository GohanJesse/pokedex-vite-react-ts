import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../view/HomePage/HomePage';
import DetailsPage from '../view/DetailsPage/DetailsPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

