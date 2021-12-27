import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/movies-api';

export default function Cast() {
  const { movieId } = useParams();
  // console.log(movieId);

  const [actors, setActors] = useState([]);

  useEffect(() => {
    api.getMovieActors(movieId).then(setActors);
  }, []);

  // console.log(actors);

  return (
    <>
      {actors.length > 0 ? (
        <ul>
          {actors.map(actor => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      ) : (
        <p>There is no information about cast of this movie</p>
      )}
    </>
  );
}
