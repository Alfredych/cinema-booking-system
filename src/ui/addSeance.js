import availableTimeSeance from '../util/availableTimeSeance.js';

export default function addSeance(event, onDataSeancesAdd, allData) {
  event.preventDefault();
  const { currentTarget } = event;
  const formData = new FormData(currentTarget);
  let data = Object.fromEntries(formData);
  data.id = +('0' + String(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000));

  data = Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (key !== 'seance_time') {
      return [key, +value];
    } else {
      return [key, value];
    }
  }));

  // Проверка допустимого времени
  const availableSeanceTime = availableTimeSeance(data.seance_time, data.seance_hallid, data.seance_filmid, allData);
  if (!availableSeanceTime) {
    alert('Сеанс пересекается по времени с другими сеансами');
  } else {
    currentTarget?.reset();
    const popup = currentTarget.closest('.popup');
    popup?.classList.add('hidden');
    onDataSeancesAdd(data);
  }
};