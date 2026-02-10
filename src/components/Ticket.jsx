import { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';

const Ticket = () => {
  const [data, setData] = useState();
  const { state } = useLocation();

  const root = document.querySelector(':root');
  if (root) {
    root.classList.remove('root__admin');
  }


  const tickets = [];
  state?.map(item => {
    const ticket = {};
    ticket.Дата = item.ticket_date;
    ticket.Время = item.ticket_time;
    ticket['Название фильма'] = item.ticket_filmname;
    ticket.Зал = item.ticket_hallname;
    ticket.Ряд = item.ticket_row;
    ticket.Место = item.ticket_place;
    ticket.Стоимость = item.ticket_price + ' руб.';
    ticket.Информация = 'Билет действителен строго на свой сеанс';
    tickets.push(ticket);
  });

  const dataArr = [];
  tickets.map(item => {
    const entries = Object.entries(item).map(([key, value]) => [key, value].join(': ')).join(', ');
    dataArr.push(entries);
  });
  const dataForGRCode = dataArr.join('; ');


  const qrcode = window.QRCreator(dataForGRCode, { modsize: 2 });
  const content = (qrcode) => {
    return qrcode.error ?
      `недопустимые исходные данные ${qrcode.error}` :
      qrcode.result;
  };

  useEffect(() => {
    const div = document.getElementById('qrcode');
    if (div?.children?.length === 0) {
      document.getElementById('qrcode')?.append(content(qrcode));
    }

    setData(state);
  }, [setData, state, qrcode]);

  const placesArr = [];
  state?.map(item => placesArr.push(item.ticket_place));
  const places = placesArr.join(', ');

  if (!state) return <Navigate to={'/'} />;

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="home" />
        </Link>
      </header>

      <main className="client__main">
        <header className="client__header">Электронный билет</header>
        <div className="client__content">
          <div className="text-description">
            <p className="text-description__item">На фильм: <span className="text-value">{(data ? data : state)[0]?.ticket_filmname}</span></p>
            <p className="text-description__item">Места: <span className="text-value">{places}</span></p>
            <p className="text-description__item">В зале: <span className="text-value">{(data ? data : state)[0]?.ticket_hallname}</span></p>
            <p className="text-description__item">Начало сеанса: <span className="text-value">{(data ? data : state)[0]?.ticket_time}</span></p>
          </div>

          <div className="qr-code" id="qrcode"></div>
          <div className="text-annotation">
            <p className="text-annotation__item">
              Покажите QR-код нашему контроллеру для подтверждения бронирования.
            </p>
            <p className="text-annotation__item">Приятного просмотра!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Ticket;