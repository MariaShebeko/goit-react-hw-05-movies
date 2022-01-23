import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/movies-api';
import { FcRating } from 'react-icons/fc';
import slugify from 'slugify';
import s from './HomePage.module.css';

export default function HomePage() {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    api.getTrendingMovies().then(setTrendingMovies);
  }, []);

  return (
    <>
      <h1 className={s.header}>Trending movies</h1>
      {trendingMovies && (
        <ul className={s.list}>
          {trendingMovies.map(movie => (
            <li key={movie.id} className={s.item}>
              <Link
                to={{
                  pathname: `/movies/${slugify(`${movie.title} ${movie.id}`, {
                    lower: true,
                    strict: true,
                  })}`,
                  state: { from: location },
                }}
                className={s.link}
              >
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
                    ? movie.release_date.slice(0, 4)
                    : movie.first_air_date.slice(0, 4)}
                  )
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
