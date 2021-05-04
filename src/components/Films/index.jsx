import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { API_KEY, baseURL } from '../../common/api/api';
import Preloader from '../../common/Preloader';
import Film from './Film';
import styles from './style.module.css';

const Films = ({ history, searchResults }) => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const fetchData = async () => {
    setIsLoad(true);
    const response = await fetch(
      `${baseURL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    ).then((res) => res.json());
    setFilms([...films, ...response.results]);
    setIsLoad(false);
    incrementPage();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateFilm = (url, route) => {
    history.push({
      pathname: route,
      films: { url },
    });
  };

  return (
    <div className={styles.container}>
      {isLoad && <Preloader />}
      {!searchResults ? (
        <h2 className={styles.title}>Popular Films</h2>
      ) : (
        <h2 className={styles.title}>Search Results</h2>
      )}
      {!searchResults ? (
        <>
          <div className={styles.wrapper}>
            {films.map((film) => (
              <Film key={film.id} film={film} navigateFilm={navigateFilm} />
            ))}
          </div>
          <div className={styles.loadButton}>
            <button
              onClick={() => {
                fetchData();
              }}
            >
              Load More
            </button>
          </div>
        </>
      ) : (
        <div className={styles.wrapper}>
          {searchResults.map((film, index) => (
            <Film key={index} film={film} navigateFilm={navigateFilm} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(Films);
