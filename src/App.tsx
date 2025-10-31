import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';
import { MoviesProvider } from './contexts/MoviesProvider';
import { FavoritesProvider } from './contexts/FavoritesProvider';
import { Layout } from './components/Layout';
import { Toaster } from './components/Toaster';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';
import { Search } from './pages/Search';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <FavoritesProvider>
        <MoviesProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </Layout>
            <Toaster />
          </BrowserRouter>
        </MoviesProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;