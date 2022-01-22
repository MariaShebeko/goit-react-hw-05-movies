import { BiLoaderCircle } from 'react-icons/bi';
import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={s.loadBtn} type="button" onClick={() => onClick()}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <BiLoaderCircle className={s.loadIcon} /> <span>Load more</span>
    </button>
  );
};

export default LoadMoreButton;
