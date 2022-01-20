import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/movies-api';
import noImage from '../../images/no-image.webp';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    api.getMovieActors(movieId).then(setActors);
  }, []);

  return (
    <>
      <div className={s.Wrapper}>
        {actors.length > 0 ? (
          <ul className={s.list}>
            {actors.map(actor => (
              <li key={actor.id} className={s.item}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : noImage
                  }
                  alt={actor.name}
                  className={s.image}
                />
                <p className={s.text}>{actor.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>There is no information about cast of this movie</p>
        )}
      </div>
    </>
  );
}
