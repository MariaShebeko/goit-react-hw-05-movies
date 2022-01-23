import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import Navigation from './components/Navigation';
import MoviesLoader from './components/Loader';
import ScrollUp from './components/ScrollUpButton';
import ScrollUpButton from './components/ScrollUpButton';
const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "movie-detail-page" */
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "not-found-page" */),
);

function App() {
  return (
    <Container>
      <Navigation />
      <Toaster />
      <ScrollUpButton />
      <Suspense fallback={<MoviesLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
