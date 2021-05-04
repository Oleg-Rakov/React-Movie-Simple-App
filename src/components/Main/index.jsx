import { useEffect, useState } from 'react';
import { API_KEY, baseURL } from '../../common/api/api';
import Preloader from '../../common/Preloader';
import Films from '../Films';
import Header from '../Header';
import Search from '../Search';

const Main = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const fetchData = async () => {
    setIsLoad(true);
    const response = await fetch(
      `${baseURL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    ).then((res) => res.json());
    setTotalPageCount(response.total_pages);
    setFilms([...response.results]);
    setIsLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      {isLoad && <Preloader />}
      <Header />
      <Search fetchData={fetchData} setFilms={setFilms} />
      <Films
        page={page}
        totalPageCount={totalPageCount}
        setPage={setPage}
        fetchData={fetchData}
        films={films}
      />
    </>
  );
};

export default Main;
