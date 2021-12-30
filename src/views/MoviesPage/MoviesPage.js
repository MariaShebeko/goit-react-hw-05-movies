import { useState, useEffect } from 'react';
import api from '../../services/movies-api';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoadMoreButton from '../../components/LoadMoreButton';
import SearchForm from '../../components/SearchForm';
import { FcRating } from 'react-icons/fc';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();

  const [movieName, setMovieName] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (movieName) {
      api.getMoviesBySearch(movieName, page).then(setMovies);
    }
  }, [movieName, page]);

  const formSubmit = movieName => {
    setMovieName(movieName);
    setMovies([]);

    history.push({
      ...location,
      search: `query=${movieName}`,
    });
  };

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
      <SearchForm onSubmit={formSubmit} />
      {movies && (
        <ul className={s.list}>
          {movies.map(movie => (
            <li key={movie.id} className={s.item}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
                className={s.link}
              >
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={s.image}
                  />
                  <div className={s.iconWrapper}>
                    <FcRating className={s.icon} />
                    <span className={s.vote}>{movie.vote_average}</span>
                  </div>
                  <p className={s.title}>
                    {movie.title ? movie.title : movie.name} (
                    {movie.release_date
                      ? movie.release_date
                      : movie.first_air_date}
                    )
                  </p>
                </div>{' '}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {movies.length > 1 && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
