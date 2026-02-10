import createRequest from '../api/createRequest';

export default function addFilm(event, onDataChange, setFilmDuration) {
  event.preventDefault();
  const { currentTarget } = event;
  const formData = new FormData(currentTarget);

  createRequest({
    url: 'film',
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.success) {
      currentTarget?.reset();
      setFilmDuration('');

      const fileInput = currentTarget?.querySelector('input[type=file]');
      if (fileInput) {
        const fileLabel = currentTarget?.querySelector('.upload-poster_label');
        if (fileLabel) {
          fileLabel.classList.remove('upload-poster_label-selected');
          fileLabel.textContent = 'Загрузить постер';
        }
      }

      const popup = currentTarget.closest('.popup');
      popup?.classList.add('hidden');
      onDataChange(response.result);
    } else {
      alert(response.error);
    }
  });
};