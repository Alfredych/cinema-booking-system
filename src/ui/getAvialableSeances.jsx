import { Link } from 'react-router-dom';

const checkAvailableTime = (time) => {
  const today = new Date();
  const todayHours = today.getHours();
  const todayMinutes = today.getMinutes();
  const nowInMinutes = todayHours * 60 + todayMinutes;
  const [hours, minutes] = time.split(':');
  const timeInMinutes = +hours * 60 + +minutes;
  return nowInMinutes < timeInMinutes;
};

const calcTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return +hours * 60 + +minutes;
};

const getAvailableSeancesforHall = (film, hall, availableSeances, location) => {
  const todaysSeances = location.pathname === '/';
  const availableSeancesforHall = [];

  availableSeances?.forEach(seance => {
    if (hall.id === seance.seance_hallid && film.id === seance.seance_filmid) {
      const availableTime = checkAvailableTime(seance.seance_time);
      const seanceItem = (todaysSeances && !availableTime) ? (
        <div
          className="movies__btn_start-time movies__btn_start-time-unavailable"
          data-time={seance.seance_time}
          key={seance.id}
        >
          {seance.seance_time}
        </div>
      ) : (
        <Link
          to={"/hall/" + seance.id}
          state={{
            seanceId: seance.id,
            url: location.pathname,
            time: seance.seance_time,
            filmName: film.film_name,
            hallName: hall.hall_name,
            hallPriceStandart: hall.hall_price_standart,
            hallPriceVip: hall.hall_price_vip
          }}
          data-time={seance.seance_time}
          key={seance.id}
        >
          <div className="movies__btn_start-time">{seance.seance_time}</div>
        </Link>
      );
      availableSeancesforHall.push(seanceItem);
    }
  });

  availableSeancesforHall.sort((a, b) => {
    return calcTimeInMinutes(a.props['data-time']) - calcTimeInMinutes(b.props['data-time']);
  });
  return availableSeancesforHall;
};

const getAvailableHallsforFilm = (film, availableSeances, data, location) => {
  const availableHalls = [];
  data?.halls?.forEach(hall => {
    const seanceIsPresent = availableSeances?.find(seance => {
      return film.id === seance.seance_filmid && seance.seance_hallid === hall.id;
    });

    if (seanceIsPresent) {
      const hallItem = (
        <div className="movies__hall" key={hall.id}>
          <h2 className="movies__hall-title">{hall.hall_name}</h2>
          <div className="movies__start-time">
            {getAvailableSeancesforHall(film, hall, availableSeances, location)}
          </div>
        </div>
      );
      availableHalls.push(hallItem);
    }
  });
  return availableHalls;
}

export default getAvailableHallsforFilm;