import createRequest from '../api/createRequest';
import getFormData from '../api/getFormData';

export default function onAdd(event, onDataChange, onDataHallValuesChange) {
  event.preventDefault();
  const { currentTarget } = event;
  const data = getFormData(currentTarget);

  createRequest({
    url: "hall",
    method: 'POST',
    headers: {
      'Content-Type': 'applicaton/json'
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.success) {
      currentTarget?.reset();
      const popup = currentTarget.closest('.popup');
      popup?.classList.add('hidden');
      onDataChange(response.result);
      const firstHall = response.result.halls.length === 1;

      if (firstHall) {
        onDataHallValuesChange(response.result.halls[0]);
      }
    } else {
      alert(response.error);
    }
  });
};