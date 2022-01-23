import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/movies-api';
import noImage from 'images/No-Image.png';
import s from './Cast.module.css';

export default function Cast() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [actors, setActors] = useState([]);

  useEffect(() => {
    api.getMovieActors(movieId).then(setActors);
  }, []);

  return (
    <>
      <div className={s.Wrapper}>
        {actors.length > 0 ? (
          <ul className={s.list}>
            {actors.map(actor => {
              const imageUrl = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
              return (
                <li key={actor.id} className={s.item}>
                  <div className={s.container}>
                    <div
                      className={s.card}
                      style={{
                        backgroundImage: actor.profile_path
                          ? 'url(' + imageUrl + ')'
                          : 'url(' + noImage + ')',
                        // backgroundSize: '300px',
                        // '&:hover': {
                        //   background:
                        //     'url(' + imageUrl + ') left center no-repeat',
                        // },
                      }}
                    >
                      <div className={s.border}>
                        <h2 className={s.cardTitle}>{actor.name}</h2>
                      </div>
                    </div>
                  </div>
                  {/* <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : noImage
                  }
                  alt={actor.name}
                  className={s.image}
                />
                <p className={s.text}>{actor.name}</p> */}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>There is no information about cast of this movie</p>
        )}
      </div>
    </>
  );
}
