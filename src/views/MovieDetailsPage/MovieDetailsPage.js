import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import api from '../../services/movies-api';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  // const match = useRouteMatch();
  // console.log('movieDetailMatch', match);

  const { url, path } = useRouteMatch();
  // console.log('movieDetail', url);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  console.log(movie);

  return (
    <>
      {movie && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>
            {movie.title ? movie.title : movie.name} (
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : movie.first_air_date.slice(0, 4)}
            )
          </h2>
          <p>Raiting: {movie.vote_average}</p>
          <h3>Overwiew</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>
            {movie.genres.map(genre => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </p>
        </div>
      )}
      <hr />
      {
        <div>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>

          <Suspense fallback={<div>Downloading...</div>}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </div>
      }
    </>
  );
}
