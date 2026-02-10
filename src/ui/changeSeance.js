import createRequest from '../api/createRequest.js';
import showMessageSave from './showMessageSave.js';

const changeSeances = (event, data, onDataChange, dataSeances, onDataSeancesChange) => {
  event.preventDefault();
  const { currentTarget } = event;

  // Добавление сеанса
  dataSeances.forEach(seance => {
    const seanceFound = data?.seances.find(seanceSaved => seance.id === seanceSaved.id);
    if (!seanceFound) {
      const newSeanceData = {};
      newSeanceData.seanceHallid = seance.seance_hallid;
      newSeanceData.seanceFilmid = seance.seance_filmid;
      newSeanceData.seanceTime = seance.seance_time;

      createRequest({
        url: 'seance',
        method: 'POST',
        headers: {
          'Content-Type': 'applicaton/json'
        },
        body: JSON.stringify(newSeanceData),
      }).then((response) => {
        if (response.success) {
          onDataChange(response.result);
          onDataSeancesChange(response.result);
          showMessageSave(currentTarget);
        } else {
          alert(response.error);
        }
      });
    }
  });

  // Удаление сеанса
  data?.seances.forEach(seanceSaved => {
    const seanceFound = dataSeances.find(seance => seance.id === seanceSaved.id);
    if (!seanceFound) {
      createRequest({
        url: 'seance/' + seanceSaved.id,
        method: 'DELETE',
        headers: {
          'Content-Type': 'applicaton/json'
        },
        body: JSON.stringify(seanceSaved.id),
      }).then((response) => {
        if (response.success) {
          onDataChange(response.result);
          onDataSeancesChange(response.result);
          showMessageSave(currentTarget);
        } else {
          alert(response.error);
        }
      });
    }
  });
};

export default changeSeances;