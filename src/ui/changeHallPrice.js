import createRequest from '../api/createRequest';
import getFormData from '../api/getFormData';
import showMessageSave from './showMessageSave';

export default function changeHallPrice(event, onDataHallChange, setHallPriceStandart, setHallPriceVip) {
  event.preventDefault();
  const { currentTarget } = event;
  const data = getFormData(currentTarget);
  const hallId = data.hallId;
  delete data.hallId;

  if (+data.priceStandart >= 0 && +data.priceVip >= 0) {
    createRequest({
      url: 'price/' + hallId,
      method: 'POST',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.success) {
        onDataHallChange(response.result);
        setHallPriceStandart(response.result.hall_price_standart);
        setHallPriceVip(response.result.hall_price_vip);
        showMessageSave(currentTarget);
      } else {
        alert(response.error);
      }
    });
  } else {
    alert('Цены не могут быть отрицательными');
  }
};