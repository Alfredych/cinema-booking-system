import { useEffect, useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import createRequest from '../api/createRequest';
import getHallConfig from '../ui/getHallConfig';
import reserve from '../ui/reserve';
import logo from '../assets/svg/logo.svg';
import screenImg from '../assets/png/scheme.png';
import chairFree from '../assets/svg/chair-free.svg';
import chairFreeVip from '../assets/svg/chair-free-vip.svg';
import chairOccupied from '../assets/svg/chair-occupied.svg';
import chairSelected from '../assets/svg/chair-selected.svg';
import hint from '../assets/svg/hint.svg';


const Hall = () => {
  const [data, setData] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();

  // Расчет даты
  const today = new Date();
  const indexOfStartOfDay = state?.url.lastIndexOf('/');
  const countOfDays = Number(state?.url.slice(indexOfStartOfDay + 1));
  const date = new Date(today);
  date.setDate(today.getDate() + countOfDays);
  const day = date.toLocaleString('ru-RU', { day: '2-digit' });
  const month = date.toLocaleString('ru-RU', { month: '2-digit' });
  const dateForRequest = date.getFullYear() + '-' + month + '-' + day;

  useEffect(() => {
    createRequest({
      url: 'hallconfig?seanceId=' + state?.seanceId + '&date=' + dateForRequest,
      method: 'GET',
    }).then((response) => {
      if (response.success) {
        setData(response.result);
      }
    });
  }, [setData, dateForRequest, state]);

  if (!state) return <Navigate to={'/'} />;

  const root = document.querySelector(':root');
  if (root) {
    root.classList.remove('root__admin');
  }

  const ticketDataForRequest = {
    seanceId: state.seanceId,
    ticketDate: dateForRequest,
  };

  const ticketData = {
    priceStandart: state.hallPriceStandart,
    priceVip: state.hallPriceVip,
    filmName: state.filmName,
    hallName: state.hallName,
    time: state.time
  };

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="home" />
        </Link>
      </header>

      <main className="client__main">
        <section className="buying__section">
          <div className="buying__container">
            <div className="buying__info">
              <p className="buying__movie-name">{state.filmName}</p>
              <p className="buying__start-time">Начало сеанса: {state.time}</p>
              <p className="buying__hall-name">{state.hallName}</p>
            </div>

            <div className="buying__hint">
              <img className="buying__hint-icon" src={hint} alt="hint" />
              <p className="buying__hint-text">Тапните дважды, чтобы увеличить</p>
            </div>
          </div>

          <div className="scheme">
            <div className="scheme__content">
              <img className="scheme__screen-img" src={screenImg} alt="screen-img" />
              <div className="scheme__config">{getHallConfig(data)}</div>
            </div>

            <div className="scheme__chairs-info">
              <div className="scheme__chairs-info_column">
                <div className="scheme__chairs-item">
                  <img src={chairFree} alt="chair-free" />
                  Свободно ({state.hallPriceStandart}руб)
                </div>
                <div className="scheme__chairs-item">
                  <img src={chairFreeVip} alt="chair-free" />
                  Свободно VIP ({state.hallPriceVip}руб)
                </div>
              </div>

              <div className="scheme__chairs-info_column">
                <div className="scheme__chairs-item">
                  <img src={chairOccupied} alt="chair-free" />
                  Занято
                </div>
                <div className="scheme__chairs-item">
                  <img className="scheme__chair-img_selected" src={chairSelected} alt="chair-free" />
                  Выбрано
                </div>
              </div>

            </div>
          </div>

          <div className="actions actions_reserve">
            <button
              className="btn_ok btn_reserve"
              onClick={event => reserve(event, ticketDataForRequest, ticketData, navigate)}
            >
              Забронировать
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Hall;