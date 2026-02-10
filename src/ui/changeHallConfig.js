import createRequest from '../api/createRequest';
import getFormData from '../api/getFormData';
import getHallConfigArr from './getHallConfigArr';
import showMessageSave from './showMessageSave';

export default function changeHallConfig(event, onDataHallChange, setHallConfig) {
  event.preventDefault();
  const { currentTarget } = event;
  const data = getFormData(currentTarget);
  const hallId = data.hallId;
  delete data.hallId;
  data.config = JSON.stringify(getHallConfigArr());

  if (+data.rowCount > 0 && +data.placeCount > 0) {
    createRequest({
      url: 'hall/' + hallId,
      method: 'POST',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.success) {
        onDataHallChange(response.result);
        setHallConfig(response.result.hall_config);
        showMessageSave(currentTarget);
      } else {
        alert(response.error);
      }
    });
  } else {
    alert('Количество рядов и мест должно быть больше 0');
  }
};