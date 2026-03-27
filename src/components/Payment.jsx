import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';
import getEndOfWord from '../util/getEndOfWord.js';
import getReservationCode from '../ui/getReservationCode.js';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <Navigate to={'/'} />;

  const root = document.querySelector(':root');
  if (root) {
    root.classList.remove('root__admin');
  }


  const placesArr = [];
  state.map(item => placesArr.push(item.ticket_place));
  const places = placesArr.join(', ');
  const price = state.reduce((sum, item) => {
    return sum + item.ticket_price;
  }, 0);

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="home" />
        </Link>
      </header>
      <main className="client__main">
        <header className="client__header">Вы выбрали билеты:</header>
        <div className="client__content">
          <div className="text-description">
            <p className="text-description__item">На фильм: <span className="text-value">{state[0].ticket_filmname}</span></p>
            <p className="text-description__item">Места: <span className="text-value">{places}</span></p>
            <p className="text-description__item">В зале: <span className="text-value">{state[0].ticket_hallname}</span></p>
            <p className="text-description__item">Начало сеанса: <span className="text-value">{state[0].ticket_time}</span></p>
            <p className="text-description__item">Стоимость: <span className="text-value">{price}</span> рубл{getEndOfWord(price, "рубл")}</p>
          </div>

          <div className="actions">
            <button
              className="btn_ok btn_reserve"
              type="button"
              onClick={event => getReservationCode(event, state, navigate)}
            >
              Получить код бронирования
            </button>
          </div>

          <div className="text-annotation">
            <p className="text-annotation__item">
              После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.
            </p>
            <p className="text-annotation__item">Приятного просмотра!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Payment;