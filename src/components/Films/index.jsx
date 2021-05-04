import { withRouter } from 'react-router';
import Paginator from '../../common/paginator';
import Film from './Film';
import styles from './style.module.css';

const Films = ({ history, films, totalPageCount, page, setPage }) => {
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
        <Paginator
          setPage={setPage}
          totalPageCount={totalPageCount}
          page={page}
        />
      </div>
    </div>
  );
};

export default withRouter(Films);
