import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../services/movies-api';

export default function HomePage() {
  // const match = useRouteMatch();
  // console.log(match);

  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    api.getTrendingMovies().then(setTrendingMovies);
  }, []);

  // console.log(trendingMovies);

  return (
    <>
      {trendingMovies && (
        <ul>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <div>
                  {/* <img src={movie.poster_path} alt={movie.title} /> */}
                  <p>{movie.title ? movie.title : movie.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
