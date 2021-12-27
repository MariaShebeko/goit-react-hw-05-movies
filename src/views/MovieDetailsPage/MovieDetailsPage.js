import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/movies-api';

export default function MovieDetailsPage() {
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
    </>
  );
}
