import styles from '../style.module.css';
import noImage from '../../../assets/images/no-image.png';
import { NavLink } from 'react-router-dom';

const SimilarFilm = ({ film, navigateFilm}) => {
  return (
    <div
      onClick={() => navigateFilm(film.id, `/film/${film.id}`)}
      className={styles.item}
    >
      <NavLink exact to={`/film/${film.id}`} className={styles.itemTitle}>
        {film.poster_path ? (
          <img
            className={styles.posterImg}
            src={'https://image.tmdb.org/t/p/w200/' + film.poster_path}
            alt="film item"
          />
        ) : (
          <img src={noImage} alt="no img" />
        )}
        {film.title}
      </NavLink>
      <p className={styles.itemInfo}>
        Рейтинг: <strong>{film.vote_average}</strong> / Голосов:{' '}
        {film.vote_count}
      </p>
    </div>
  );
};

export default SimilarFilm;
