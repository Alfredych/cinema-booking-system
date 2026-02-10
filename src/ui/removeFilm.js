import createRequest from '../api/createRequest';

export default function removeFilm(event, id, onDataChange, filmName) {
  event.preventDefault();
  const confirmation = confirm(`Вы действительно хотите удалить фильм "${filmName}"?`);

  if (confirmation) {
    createRequest({
      url: 'film/' + id,
      method: 'DELETE',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(id),
    }).then((response) => {
      if (response.success) {
        onDataChange(response.result);
      } else {
        alert(response.error);
      }
    });
  }
};