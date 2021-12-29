import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/movies-api';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    api.getMovieActors(movieId).then(setActors);
  }, []);

  return (
    <>
      {actors.length > 0 ? (
        <ul className={s.list}>
          {actors
            .map(actor => (
              <li key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : '../../images/no-image.webp'
                  }
                  alt={actor.name}
                />
                <p className={s.text}>{actor.name}</p>
              </li>
            ))
            .slice(0, 20)}
        </ul>
      ) : (
        <p>There is no information about cast of this movie</p>
      )}
    </>
  );
}
