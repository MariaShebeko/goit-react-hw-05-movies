import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

export default function MoviesLoader() {
  return (
    <div className={s.Loader}>
      <Loader
        type="Grid"
        color="#99f2f5"
        height={80}
        width={80}
        timeout={3000}
      />
    </div>
  );
}
