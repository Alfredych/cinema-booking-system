const calcWidthInPercent = (filmId) => {
  const filmsArr = document.querySelectorAll('.admin-settings__movie-item');
  const currentFilmItem = Array.from(filmsArr).find(filmItem => +filmItem.dataset.id === filmId);

  if (currentFilmItem) {
    const currentFilmDuration = currentFilmItem.querySelector('.admin-settings__movie-duration')?.dataset.duration;
    const minutesInDay = 60 * 24;
    const widthInPercent = +currentFilmDuration * 100 / minutesInDay;
    return widthInPercent;
  }
};

export default calcWidthInPercent;