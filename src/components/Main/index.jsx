import { useEffect, useState } from 'react';
import { API_KEY, baseURL } from '../../common/api/api';
import Preloader from '../../common/Preloader';
import Films from '../Films';
import Header from '../Header';
import Search from '../Search';

const Main = () => {
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
    setFilms(response.results);
    setIsLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      {isLoad && <Preloader />}
      <Header />
      <Search fetchData={fetchData} setFilms={setFilms} films={films} />
      <Films
      incrementPage={incrementPage}
        page={page}
        setPage={setPage}
        fetchData={fetchData}
        films={films}
      />
    </>
  );
};

export default Main;
