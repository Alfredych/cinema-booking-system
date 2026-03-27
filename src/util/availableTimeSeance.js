const availableTimeSeance = (time, hallid, filmid, data) => {
  const endOfDayInMinutes = 23 * 60 + 59;

  function getTimeInMinutes(time, filmid) {
    const [hours, minutes] = time.split(':');
    const startTimeInMinutes = +hours * 60 + +minutes;
    const filmDuration = data?.films.find(film => +film.id === +filmid)?.film_duration;
    const endTimeInMinutes = startTimeInMinutes + filmDuration;
    return [startTimeInMinutes, endTimeInMinutes];
  }

  const currentTime = getTimeInMinutes(time, filmid);
  const endTooLate = currentTime[1] >= endOfDayInMinutes;

  const seancesInHall = data?.seances.filter(seance => seance.seance_hallid === hallid);
  const filmsTimeIdInHall = [];
  seancesInHall.forEach(seance => {
    filmsTimeIdInHall.push(getTimeInMinutes(seance.seance_time, seance.seance_filmid));
  });

  const timeIntersection = filmsTimeIdInHall.some(filmTime => {
    return (currentTime[0] >= filmTime[0] && currentTime[1] <= filmTime[1])
      || (currentTime[0] <= filmTime[0] && currentTime[1] >= filmTime[0])
      || (currentTime[1] >= filmTime[1] && currentTime[0] <= filmTime[1]);
  });

  if (!endTooLate && !timeIntersection) {
    return true;
  } else {
    return false;
  }
};

export default availableTimeSeance;