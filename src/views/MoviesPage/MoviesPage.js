import { useState, useEffect } from 'react';
import api from '../../services/movies-api';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoadMoreButton from '../../components/LoadMoreButton';

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
    setPage(page);
    history.push({
      ...location,
      search: `query=${movieName}`,
    });
  };

  useEffect(() => {
    if (movieName) {
      api.getMoviesBySearch(movieName, page).then(setMovies);
    }
  }, [movieName, page]);

  const onLoadMore = () => {
    setMovies(prev => [...prev, ...movies]);
    setPage(page + 1);

    const options = {
      top: null,
      behavior: 'smooth',
    };
    options.top = window.pageYOffset + document.documentElement.clientHeight;
    setTimeout(() => {
      console.log('scrol');

      window.scrollTo(options);
    }, 1000);
  };

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
      {movies.length > 1 && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
