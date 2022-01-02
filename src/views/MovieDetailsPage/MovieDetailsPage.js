import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import api from '../../services/movies-api';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const locationRef = useRef(location);
  console.log(locationRef);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    if (locationRef.current.state) {
      const { pathname, search } = locationRef.current.state.from;
      history.push(search ? pathname + search : pathname);
    }
    // history.push(location?.state?.from ?? '/');
  };
  return (
    <>
      {
        <button type="button" onClick={onGoBack} className={s.button}>
          Go back
        </button>
      }
      {movie && (
        <div className={s.cardWrapper}>
          <div className={s.imageWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={s.imageActor}
            />
          </div>
          <div className={s.textWrapper}>
            <h2 className={s.title}>
              {movie.title ? movie.title : movie.name} (
              {movie.release_date
                ? movie.release_date.slice(0, 4)
                : movie.first_air_date.slice(0, 4)}
              )
            </h2>
            <p className={s.text}>Raiting: {movie.vote_average}</p>
            <h3 className={s.title}>Overwiew</h3>
            <p className={s.text}>{movie.overview}</p>
            <h3 className={s.title}>Genres</h3>
            <p>
              {movie.genres.map(genre => (
                <span
                  key={genre.id}
                  className={s.text}
                >{`${genre.name} `}</span>
              ))}
            </p>
          </div>
        </div>
      )}
      {
        <div className={s.castReviewWrapper}>
          <NavLink
            to={`${url}/cast`}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Cast
          </NavLink>
          <NavLink
            to={`${url}/reviews`}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Reviews
          </NavLink>

          <Suspense fallback={<div>Downloading...</div>}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </div>
      }
    </>
  );
}
