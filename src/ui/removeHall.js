import createRequest from '../api/createRequest';

export default function removeHall(event, id, hallName, onDataChange, onDataHallValuesChange) {
  event.preventDefault();
  const confirmation = confirm(`Вы действительно хотите удалить зал "${hallName}"?`);

  if (confirmation) {
    createRequest({
      url: 'hall/' + id,
      method: 'DELETE',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(id),
    }).then((response) => {
      if (response.success) {
        onDataChange(response.result);
        const noHalls = response.result.halls.length === 0;

        if (noHalls) {
          onDataHallValuesChange(null);
        }
      } else {
        alert(response.error);
      }
    });
  }
};