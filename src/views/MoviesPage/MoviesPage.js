import { useState, useEffect } from 'react';
import api from '../../services/movies-api';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  console.log('history', history);
  console.log('location', location);

  const [movieName, setMovieName] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const handleNameChange = event => {
    setMovieName(event.target.value.toLowerCase());
  };

  const handleNameSubmit = event => {
    event.preventDefault();

    if (movieName.trim() === '') {
      alert('Press the name of the movie');
    }
    setMovieName(movieName);
    history.push({ ...location, search: `query=${movieName}` });
  };

  useEffect(() => {
    if (movieName) {
      api.getMoviesBySearch(movieName, page).then(setMovies);
    }
  }, [movieName, page]);

  return (
    <>
      {
        <form onSubmit={handleNameSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            onChange={handleNameChange}
            value={movieName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Enter the name of the movie"
          />
        </form>
      }
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <p>{movie.title ? movie.title : movie.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
