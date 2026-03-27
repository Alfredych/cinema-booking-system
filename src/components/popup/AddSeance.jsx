import { useEffect, useState } from 'react';
import { closePopup } from '../../ui/btnPopupVisibility.js';
import addSeance from '../../ui/addSeance.js';

const AddSeance = ({ data, dataForSeance, onDataSeancesAdd }) => {
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');

  useEffect(() => {
    const selectedHallId = dataForSeance ? data?.halls?.find(hall => hall.hall_name === dataForSeance.hall)?.id : '';
    const selectedFilmId = dataForSeance ? data?.films?.find(film => film.film_name === dataForSeance.film)?.id : '';
    setSelectedHall(selectedHallId);
    setSelectedFilm(selectedFilmId);
  }, [dataForSeance, data?.halls, data?.films, setSelectedHall, setSelectedFilm]);

  const onChangeHall = (event) => {
    setSelectedHall(event.target.value);
  };

  const onChangeFilm = (event) => {
    setSelectedFilm(event.target.value);
  };

  return (
    <div className="popup popup_create-seans hidden">
      <section className="popup__container">
        <div className="popup__content">
          <header className="popup__header">
            Добавление сеанса
            <button className="btn_close" type="button" onClick={event => closePopup(event)}></button>
          </header>

          <form className="popup__form" onSubmit={event => addSeance(event, onDataSeancesAdd, data)}>
            <div className="popup__settings">
              <label className="admin__label popup__label" htmlFor="seans-hall-name">Название зала</label>
              <select className="popup__select" name="seance_hallid" id="seans-hall-name" onChange={onChangeHall} value={selectedHall} >
                {data?.halls?.map(hall => {
                  return (
                    <option value={hall.id} key={hall.id}>{hall.hall_name}</option>
                  );
                })}
              </select>

              <label className="admin__label popup__label" htmlFor="seans-film-name">Название фильма</label>
              <select className="popup__select" name="seance_filmid" id="seans-film-name" onChange={onChangeFilm} value={selectedFilm} >
                {data?.films?.map(film => {
                  return (
                    <option value={film.id} key={film.id}>{film.film_name}</option>
                  );
                })}
              </select>

              <label className="admin__label popup__label" htmlFor="seans-start-time">Время начала</label>
              <input className="admin__input popup__input" type="time" name="seance_time" id="seans-start-time" placeholder="00:00" defaultValue="00:00" required />
            </div>

            <div className="actions actions_popup">
              <button className="btn_ok popup__btn">Добавить сеанс</button>
              <button className="btn_cancel popup__btn" type="button" onClick={event => closePopup(event)}>Отменить</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddSeance;