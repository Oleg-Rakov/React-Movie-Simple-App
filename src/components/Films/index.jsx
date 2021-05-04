import { withRouter } from 'react-router';
import Film from './Film';
import styles from './style.module.css';

const Films = ({ history, films, incrementPage }) => {
  const navigateFilm = (url, route) => {
    history.push({
      pathname: route,
      films: { url },
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Popular Films</h2>
      <div className={styles.wrapper}>
        {films &&
          films.map((film) => (
            <Film key={film.id} film={film} navigateFilm={navigateFilm} />
          ))}
      </div>
      <div className={styles.loadButton}>
        <button onClick={incrementPage}>Load More</button>
      </div>
    </div>
  );
};

export default withRouter(Films);
