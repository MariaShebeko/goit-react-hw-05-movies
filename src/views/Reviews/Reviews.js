import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/movies-api';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.getMovieReviews(movieId).then(setReviews);
  }, []);

  console.log(reviews);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(review => (
            <li key={review.id} className={s.item}>
              <p className={s.title}>
                {review.author} `${review.created_at.slice(0, 10)}`
              </p>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no reviews about this movie</p>
      )}
    </>
  );
}
