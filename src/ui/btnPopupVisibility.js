export const createHall = (event) => {
  event.preventDefault();
  const popupCreateHall = document.querySelector('.popup_create-hall');
  popupCreateHall?.classList.remove('hidden');
};

export const addFilm = (event) => {
  event.preventDefault();
  const popupAddFilm = document.querySelector('.popup_add-film');
  popupAddFilm?.classList.remove('hidden');
};

export const closePopup = (event) => {
  event.preventDefault();
  const target = event.target;
  const popup = target.closest('.popup');
  popup?.classList.add('hidden');
  const form = popup?.querySelector('form');
  form?.reset();
};

export const closePopupAddFilm = (event, setFilmDuration) => {
  event.preventDefault();
  const target = event.target;
  const popup = target.closest('.popup');
  popup?.classList.add('hidden');
  const form = popup?.querySelector('form');
  form?.reset();
  setFilmDuration('');

  const fileInput = form?.querySelector('input[type=file]');
  if (fileInput) {
    const fileLabel = form?.querySelector('.upload-poster_label');
    if (fileLabel) {
      fileLabel.classList.remove('upload-poster_label-selected');
      fileLabel.textContent = 'Загрузить постер';
    }
  }
};