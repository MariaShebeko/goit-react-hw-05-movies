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
import noImage from '../../images/no-image.webp';
import Modal from '../../components/Modal/Modal';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews" */),
);
const Trailer = lazy(() =>
  import('../../components/Trailer' /* webpackChunkName: "trailer" */),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const locationRef = useRef(location);

  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const toggleModal = () => {
    setShowModal(!showModal);
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
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : noImage
              }
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
            <ul className={s.genreList}>
              {movie.genres.map(genre => (
                <li key={genre.id} className={s.text}>{`${genre.name} `}</li>
              ))}
            </ul>
            <button type="button" onClick={toggleModal} className={s.button}>
              Watch trailer
            </button>
            {showModal && (
              <Modal onClose={toggleModal}>
                <Trailer id={movieId} />
              </Modal>
            )}
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
