const timeGridSeance = (time) => {
  const [hours, minutes] = time.split(':');
  const minutesDay = 60 * 24;
  const timeInMinutes = +hours * 60 + +minutes;
  const timeInPercent = timeInMinutes * 100 / minutesDay;
  return timeInPercent;
};

export default timeGridSeance;