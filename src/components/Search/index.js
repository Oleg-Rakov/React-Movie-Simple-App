import styles from './style.module.css';
import search from '../../assets/images/search.svg';
import { API_KEY, baseURL } from '../../common/api/api';

const Search = ({ searchResults, setSearchResults }) => {
  const onChangeInput = (e) => {
    const fetchResults = async () => {
      const response = await fetch(
        `${baseURL}search/movie?query=${e.target.value}&api_key=${API_KEY}`
      ).then((res) => res.json());
      setSearchResults(response.results);
    };
    fetchResults();
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search Movie"
          onChange={onChangeInput}
        />
        <img src={search} className={styles.search} alt="search" />
      </div>
    </div>
  );
};

export default Search;
