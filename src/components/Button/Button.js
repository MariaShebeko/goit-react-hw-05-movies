import { ImYoutube2 } from 'react-icons/im';
import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <ImYoutube2 className={s.trailerIcon} />
    </button>
  );
}
