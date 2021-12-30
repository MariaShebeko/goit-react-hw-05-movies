import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import toastify from '../../helpers/toastify';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [movieName, setMovieName] = useState('');

  const handleNameChange = event => {
    setMovieName(event.target.value.toLowerCase());
  };

  const handleNameSubmit = event => {
    event.preventDefault();

    if (movieName.trim() === '') {
      toastify('Press the name of the movie');
      return;
    }
    onSubmit(movieName);
    setMovieName('');
  };

  return (
    <>
      {
        <form onSubmit={handleNameSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <FcSearch className={s.icon} />
          </button>
          <input
            onChange={handleNameChange}
            value={movieName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Enter the name of the movie"
            className={s.input}
          />
        </form>
      }
    </>
  );
}
