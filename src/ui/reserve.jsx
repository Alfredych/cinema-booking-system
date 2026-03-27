import getReservedPlaces from './getReservedPlaces.js';
import createRequest from '../api/createRequest.js';

const reserve = (event, ticketDataForRequest, ticketData, navigate) => {
  event.preventDefault();
  const reservedPlaces = getReservedPlaces(ticketData.priceStandart, ticketData.priceVip);

  if (reservedPlaces.length === 0) {
    alert('Места не выбраны');
    return;
  }

  const formData = new FormData();
  Object.entries(ticketDataForRequest).map(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('tickets', JSON.stringify(reservedPlaces));

  createRequest({
    url: 'ticket',
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.success) {
      const idArr = [];
      response.result.map(item => idArr.push(item.id));
      const urlId = idArr.join('&');
      navigate('/payment/' + urlId, { state: response.result });
    } else {
      alert(response.error);
    }
  });
};

export default reserve;