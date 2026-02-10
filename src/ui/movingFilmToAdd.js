import plus from '../assets/svg/plus.svg';

const movingFilmToAdd = (event, onDataForSeance) => {
  // Создание контейнера
  const icon = document.createElement('div');
  icon.className = 'icon_moving-film';

  // Добавление постера
  const filmItem = event.currentTarget;
  const img = filmItem?.querySelector('img');
  const imgClone = img?.cloneNode(true);
  icon.append(imgClone);

  // Добавление иконки плюса
  const plusIcon = document.createElement('img');
  plusIcon.src = plus;
  plusIcon.className = 'icon_plus';
  icon.append(plusIcon);

  if (icon) {
    function moveAt(pageX, pageY) {
      if (icon) {
        icon.style.left = pageX - icon.offsetWidth / 2 + 'px';
        icon.style.top = pageY - icon.offsetHeight / 2 + 'px';
      }
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      icon.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp(event) {
      if (icon) {
        icon.hidden = true;
        const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        icon.hidden = false;

        if (!elemBelow) return;
        const droppableBelow = elemBelow.closest('.admin-settings__hall-item');

        if (currentDroppable != droppableBelow) {
          currentDroppable = droppableBelow;
        }
      }

      if (currentDroppable) {
        const popupCreateSeans = document.querySelector('.popup_create-seans');
        popupCreateSeans?.classList.remove('hidden');
        const filmName = filmItem.querySelector('.admin-settings__movie-name')?.textContent;
        const hallName = currentDroppable.querySelector('.admin-settings__hall-title')?.textContent;

        onDataForSeance({
          hall: hallName,
          film: filmName,
        });
      }

      document.removeEventListener('mousemove', onMouseMove);
      icon.removeEventListener('mouseup', onMouseUp);
      icon.remove();
    }

    function onMouseUpWithoutMove() {
      document.removeEventListener('mousemove', onMouseMove);
      icon.remove();
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

export default movingFilmToAdd;