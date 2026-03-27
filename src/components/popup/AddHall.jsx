import { closePopup } from '../../ui/btnPopupVisibility.js';
import addHall from '../../ui/addHall.js';

const AddHall = ({ onDataChange, onDataHallValuesChange }) => {
  return (
    <div className="popup popup_create-hall hidden">
      <section className="popup__container">
        <div className="popup__content">
          <header className="popup__header">
            Добавление Зала
            <button className="btn_close" type="button" onClick={event => closePopup(event)}></button>
          </header>
          <form className="popup__form" onSubmit={event => addHall(event, onDataChange, onDataHallValuesChange)}>
            <div className="popup__settings">
              <label className="admin__label popup__label" htmlFor="hall-name">Название зала</label>
              <input className="admin__input popup__input" type="text" name="hallName" id="hall-name" placeholder="Например, «Зал 1»" required />
            </div>

            <div className="actions actions_popup">
              <button className="btn_ok popup__btn">Добавить зал</button>
              <button className="btn_cancel popup__btn" type="button" onClick={event => closePopup(event)}>Отменить</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddHall;