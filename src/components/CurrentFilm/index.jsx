import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import duration from '../../assets/images/duration.svg';
import dollar from '../../assets/images/dollar.svg';
import calendar from '../../assets/images/calendar.svg';
import SimilarFilms from '../SimilarFilms';
import playIcon from '../../assets/images/play.svg';
import Preloader from '../../common/Preloader';
import noImage from '../../assets/images/no-image.png';
import { API_KEY, baseURL } from '../../common/api/api';
import { calcTime, convertMoney } from '../../common/helpers/helpers';

const CurrentFilm = (props) => {
  const [film, setFilm] = useState([]);
  const [video, setVideo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;
    const fetchData = async () => {
      setIsLoad(true);
      const response = await fetch(
        `${baseURL}movie/${props.match.params.id}?api_key=${API_KEY}`
      ).then((res) => res.json());
      if (!cleanupFunction) setFilm(response);
      setIsLoad(false);
    };
    const fetchVideo = async () => {
      const response = await fetch(
        `${baseURL}movie/${props.match.params.id}/videos?api_key=${API_KEY}`
      ).then((res) => res.json());
      Object.keys(response.results).forEach((key) => {
        if (!cleanupFunction) setVideo(response.results[key]);
      });
    };
    fetchData();
    fetchVideo();
    return () => (cleanupFunction = true);
  }, [props.match.params.id]);

  if (isLoad) return <Preloader />;
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <NavLink to="/">Home</NavLink>
      </div>
      <div
        className={styles.item}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${film.backdrop_path})`,
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.poster}>
            <div className={styles.trailer}>
              <div className={styles.play}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel='noreferrer'
                >
                  <img className={styles.playIcon} src={playIcon} alt="play" />
                </a>
              </div>
              <span className={styles.watch}>WATCH {video.type}</span>
            </div>
            {film.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300/${film.poster_path}`}
                alt="movie poster"
              />
            ) : (
              <img src={noImage} alt="without poster" />
            )}
          </div>
          <div className={styles.info}>
            <h2 className={styles.movieTitle}>{film.title}</h2>
            <p className={styles.movieDesc}>{film.overview}</p>
            <div className={styles.movieRate}>
              <span>
                <strong>IMDB RATING</strong>:
              </span>
              <span className={styles.rate}> {film.vote_average}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.filmInfo}>
        <div className={styles.time}>
          <img className={styles.duration} src={duration} alt="duration" />
          <span>Running time: {calcTime(film.runtime)}</span>
        </div>
        <div className={styles.budget}>
          <img className={styles.dollar} src={dollar} alt="dollar" />
          {film.budget ? (
            <span>Budget: {convertMoney(film.budget)}</span>
          ) : (
            <span>Budget: no information</span>
          )}
        </div>
        <div className={styles.date}>
          <img className={styles.calendar} src={calendar} alt="calendar" />
          <span>Date release: {film.release_date}</span>
        </div>
      </div>
      <SimilarFilms filmID={props.match.params.id} />
    </div>
  );
};

export default CurrentFilm;
