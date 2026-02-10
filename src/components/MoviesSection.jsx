import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import createRequest from '../api/createRequest.js';
import getEndOfWord from '../util/getEndOfWord.js';
import getAvailableHallsforFilm from '../ui/getAvialableSeances.jsx';

const MoviesSection = () => {
  const [data, setData] = useState();
  const location = useLocation();

  useEffect(() => {
    createRequest({
      url: 'alldata',
      method: 'GET',
    }).then((response) => {
      if (response.success) {
        setData(response.result);
      }
    });
  }, [setData]);

  const availableSeances = [];
  data?.seances?.map(seance => {
    const hall = data?.halls?.find(hall => hall.id === seance.seance_hallid);
    if (hall?.hall_open === 1) {
      availableSeances.push(seance);
    }
  });

  const availableFilms = [];
  data?.films?.map(film => {
    const seanceIsPresent = availableSeances.find(seance => seance.seance_filmid === film.id);
    if (seanceIsPresent) {
      availableFilms.push(film);
    }
  });

  if (availableSeances.length) {
    return (
      <div className="movies">
        {availableFilms.map(film => {
          return (
            <section className="movies__section" key={film.id}>
              <div className="movies__info">
                <img className="movies__img" src={film.film_poster} alt="poster" />
                <div className="movies__description">
                  <h2 className="movies__title">{film.film_name}</h2>
                  <p className="movies__annotation">{film.film_description}</p>
                  <p className="movies__notes">
                    <span className="movies__duration">{film.film_duration} минут{getEndOfWord(film.film_duration, "минут")}</span>
                    <span className="movies__country">{film.film_origin}</span>
                  </p>
                </div>
              </div>

              <div className="movies__halls">
                {getAvailableHallsforFilm(film, availableSeances, data, location)}
              </div>
            </section>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="movies">
        <section className="movies__section movies__section_none">
          Пока ничего нет
        </section>
      </div>
    );
  }
}

export default MoviesSection;