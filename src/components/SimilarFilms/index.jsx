import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { API_KEY, baseURL } from '../../common/api/api';
import SimilarFilm from './SimilarFilm';
import styles from './style.module.css';

const SimilarFilms = ({ filmID, history }) => {
  const [similarFilms, setSimilarFilms] = useState([]);
  useEffect(() => {
    let cleanupFunction = false;
    const fetchData = async () => {
      const response = await fetch(
        `${baseURL}movie/${filmID}/similar?api_key=${API_KEY}`
      ).then((res) => res.json());
      if (!cleanupFunction) setSimilarFilms(response.results);
    };
    fetchData();
    return () => (cleanupFunction = true);
  }, [filmID]);

  const navigateFilm = (url, route) => {
    history.push({
      pathname: route,
      similarFilms: { url },
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Смотреть похожие фильмы:</h2>
      <div className={styles.wrapper}>
        {similarFilms.map((film) => {
          return (
            <SimilarFilm
              key={film.id}
              filmID={filmID}
              film={film}
              navigateFilm={navigateFilm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(SimilarFilms);
