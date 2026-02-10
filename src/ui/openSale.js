import createRequest from '../api/createRequest';
import getFormData from '../api/getFormData';

export default function openSale(event, onDataChange, openSaleValue, setOpenSaleValue) {
  event.preventDefault();
  const { currentTarget } = event;
  const data = getFormData(currentTarget);

  if (openSaleValue === 0) {
    data.hallOpen = 1;
  } else {
    data.hallOpen = 0;
  }

  const hallId = data.hallId;
  delete data.hallId;

  createRequest({
    url: 'open/' + hallId,
    method: 'POST',
    headers: {
      'Content-Type': 'applicaton/json'
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.success) {
      onDataChange(response.result);
      setOpenSaleValue(openSaleValue === 0 ? 1 : 0);
    } else {
      alert(response.error);
    }
  });
};