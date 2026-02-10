import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const DaysMenu = () => {
  const [initialDay, setInitialDay] = useState(0);
  const now = new Date();
  const days = [];

  const btnNextDays = (event) => {
    event.preventDefault();
    setInitialDay(initialDay => {
      if (initialDay === 0) {
        return initialDay + 6;
      } else {
        return initialDay + 5;
      }
    });
  };

  const btnPrevDays = (event) => {
    event.preventDefault();
    setInitialDay(initialDay => {
      if (initialDay <= 6) {
        return initialDay - 6;
      } else {
        return initialDay - 5;
      }
    });
  };

  if (initialDay > 5) {
    const backDays = (
      <button
        key={"prev" + initialDay}
        className="days-menu__item days-menu__item_back"
        type="button"
        onClick={event => btnPrevDays(event)}
      >
      </button>
    );
    days.push(backDays);
  }

  const lastDay = initialDay > 0 ? 4 : 5;
  for (let i = initialDay; i <= initialDay + lastDay; i += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    const nowWeekday = date.toLocaleString('ru-RU', { weekday: 'short' });
    const nowDay = date.toLocaleString('ru-RU', { day: 'numeric' });
    const todayFirstString = 'Сегодня';
    const notTodayFirstString = `${nowWeekday}, `;
    const todaySecondString = `${nowWeekday}, ${nowDay}`;
    const notTodaySecondString = `${nowDay}`;
    const isWeekend = nowWeekday === 'сб' || nowWeekday === 'вс';

    const dayElement = (
      <NavLink
        key={i}
        to={i === 0 ? "/" : "/" + i}
        className={
          ({ isActive }) => (
            isActive ? "days-menu__item days-menu__item_active" : "days-menu__item"
          ) +
            (
              isWeekend ? " days-menu__item_weekend" : ""
            )
        }
      >
        {i === 0 ? todayFirstString : notTodayFirstString}
        <br />
        {i === 0 ? todaySecondString : notTodaySecondString}
      </NavLink>
    );
    days.push(dayElement);
  }

  const nextDays = (
    <button
      key={"next" + initialDay}
      className="days-menu__item days-menu__item_next"
      type="button"
      onClick={event => btnNextDays(event)}
    >
    </button>
  );
  days.push(nextDays);

  return (
    <nav className="days-menu">
      {days}
    </nav>
  );
};

export default DaysMenu;