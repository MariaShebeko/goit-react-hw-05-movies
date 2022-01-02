import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/movies-api';
import s from './Cast.module.css';
import { FiFrown } from 'react-icons/fi';

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
          {actors.map(actor => (
            <li key={actor.id} className={s.item}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <span className={s.iconWrapper}>
                  <FiFrown size={50} className={s.icon} /> <p>no image find</p>
                </span>
              )}

              <p className={s.text}>{actor.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no information about cast of this movie</p>
      )}
    </>
  );
}
