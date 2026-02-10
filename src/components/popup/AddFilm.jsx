import { useRef, useState } from 'react';
import { closePopupAddFilm } from '../../ui/btnPopupVisibility.js';
import addFilm from '../../ui/addFilm.js';
import changePoster from '../../ui/changePoster.js';

const AddFilm = ({ onDataChange }) => {
  const [filmDuration, setFilmDuration] = useState('');
  const refPosterLabel = useRef();
  const refPosterInput = useRef();

  return (
    <div className="popup popup_add-film hidden">
      <section className="popup__container">
        <div className="popup__content">
          <header className="popup__header">
            Добавление фильма
            <button className="btn_close" type="button" onClick={event => closePopupAddFilm(event, setFilmDuration)}></button>
          </header>

          <form className="popup__form" onSubmit={event => addFilm(event, onDataChange, setFilmDuration)}>
            <div className="popup__settings">
              <label className="admin__label popup__label" htmlFor="film-name">Название фильма</label>
              <input className="admin__input popup__input" type="text" name="filmName" id="film-name" placeholder="Например, Лило и Стич»" required />
              <label className="admin__label popup__label" htmlFor="film-duration">Продолжительность фильма (мин.)</label>
              <input className="admin__input popup__input" type="number" name="filmDuration" id="film-duration" value={filmDuration} onChange={event => {
                +event.currentTarget.value >= 0 ? setFilmDuration(event.currentTarget.value) : setFilmDuration("");
              }} required />
              <label className="admin__label popup__label" htmlFor="film-description">Описание фильма</label>
              <textarea className="popup__textarea" name="filmDescription" id="film-description" required />
              <label className="admin__label popup__label" htmlFor="film-origin">Страна</label>
              <input className="admin__input popup__input" type="text" name="filmOrigin" id="film-origin" required />
            </div>

            <div className="actions actions_popup">
              <button className="btn_ok popup__btn">Добавить фильм</button>
              <label
                className="btn_ok popup__btn upload-poster_label"
                htmlFor="upload-poster"
                ref={refPosterLabel}
              >
                Загрузить постер
              </label>
              <input
                className="upload-poster_input"
                type="file"
                name="filePoster"
                id="upload-poster"
                accept="image/png"
                ref={refPosterInput}
                onChange={(event) => changePoster(event, refPosterInput.current, refPosterLabel.current)}
              />
              <button
                className="btn_cancel popup__btn"
                type="button"
                onClick={event => closePopupAddFilm(event, setFilmDuration)}
              >
                Отменить
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddFilm;