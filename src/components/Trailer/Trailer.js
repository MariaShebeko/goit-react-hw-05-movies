import { useState, useEffect } from 'react';
import api from '../../services/movies-api';

export default function Trailer({ id }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    api.getMovieTrailer(id).then(data => {
      console.log('data Trailer', data);
      const idYoutube = data[0].key;
      console.log('idYoutube', idYoutube);

      setSrc(`https://www.youtube.com/embed/${idYoutube}`);
    });
  }, [id]);

  return (
    <div className="trailer-container">
      <iframe
        className="responsive-iframe"
        width="560"
        height="315"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
