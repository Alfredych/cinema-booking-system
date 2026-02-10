import recycleBin from '../assets/png/recycle.png';

const movingFilmToRemove = (event, onDataSeanceRemove, seanceId, data) => {
  // Создание контейнера
  const icon = document.createElement('div');
  icon.className = 'icon_moving-film';

  // Добавление постера
  const filmInGrid = event.currentTarget;
  const filmId = +filmInGrid.dataset.id;
  const poster = data?.films?.find(film => film.id === filmId)?.film_poster;
  const img = document.createElement('img');
  img.className = 'admin-settings__movie-img';
  img.src = poster;
  icon?.append(img);

  // Добавление иконки корзины
  const currentHall = filmInGrid.closest('.admin-settings__hall-grid');
  const recycleBinIcon = document.createElement('img');
  recycleBinIcon.src = recycleBin;
  recycleBinIcon.className = 'icon_recycle';
  currentHall?.append(recycleBinIcon);

  if (icon) {
    let movingHappened = false;

    function moveAt(pageX, pageY) {
      if (icon) {
        icon.style.left = pageX - icon.offsetWidth / 2 + 'px';
        icon.style.top = pageY - icon.offsetHeight / 2 + 'px';
      }
    }

    function onMouseMove(event) {
      movingHappened = true;
      moveAt(event.pageX, event.pageY);
      icon.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp(event) {
      if (icon) {
        icon.hidden = true;
        const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        icon.hidden = false;

        if (!elemBelow) return;
        const droppableBelow = elemBelow.closest('.icon_recycle');

        if (currentDroppable != droppableBelow) {
          currentDroppable = droppableBelow;
        }
      }

      if (currentDroppable) {
        const confirmation = confirm('Вы действительно хотите удалить сеанс?');

        if (confirmation) {
          onDataSeanceRemove(seanceId);
        };
      }

      document.removeEventListener('mousemove', onMouseMove);
      icon.removeEventListener('mouseup', onMouseUp);
      icon.remove();
      recycleBinIcon.remove();
    }

    function onMouseUpWithoutMove() {
      document.removeEventListener('mousemove', onMouseMove);
      icon.remove();
      if (!movingHappened) {
        recycleBinIcon.remove();
      }
    }

    document.body.append(icon);
    moveAt(event.pageX, event.pageY);
    let currentDroppable = null;
    document.addEventListener('mousemove', onMouseMove);
    icon.addEventListener('mouseup', onMouseUpWithoutMove);

    icon.ondragstart = function () {
      return false;
    };
  }
};

export default movingFilmToRemove;