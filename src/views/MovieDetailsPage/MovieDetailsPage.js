import { useState, useEffect } from 'react';
import { Route, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import api from '../../services/movies-api';
import Cast from '../Cast';

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

  // console.log(movie);

  return (
    <>
      {movie && (
        <div>
          <img src={movie.poster_path} alt={movie.title} />
          <h2>
            {movie.title ? movie.title : movie.name} ({movie.release_date})
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
          <Route path={`${path}/cast`}>
            <Cast />
          </Route>
        </div>
      }
    </>
  );
}
