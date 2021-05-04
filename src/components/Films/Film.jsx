import styles from './style.module.css';
import noImage from '../../assets/images/no-image.png';
import { NavLink } from 'react-router-dom';

const Film = ({ film, navigateFilm }) => {
  return (
    <div
      onClick={() => navigateFilm(film.id, `/film/${film.id}`)}
      className={styles.item}
    >
      {film.poster_path ? (
        <img
          src={'https://image.tmdb.org/t/p/w200/' + film.poster_path}
          alt="film item"
        />
      ) : (
        <img src={noImage} alt="without poster" />
      )}
      <NavLink to={`/film/${film.id}`} className={styles.itemTitle}>
        {film.title}
      </NavLink>
      <p className={styles.itemInfo}>
        Рейтинг: <strong>{film.vote_average}</strong> / Голосов:{' '}
        {film.vote_count}
      </p>
    </div>
  );
};

export default Film;
