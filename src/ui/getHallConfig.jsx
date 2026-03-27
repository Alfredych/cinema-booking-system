import chair from '../assets/svg/chair.svg';
import chairVip from '../assets/svg/chair-vip.svg';
import chairNone from '../assets/svg/chair-none.svg';
import getHallConfigArr from './getHallConfigArr';
import chairFree from '../assets/svg/chair-free.svg';
import chairFreeVip from '../assets/svg/chair-free-vip.svg';
import chairOccupied from '../assets/svg/chair-occupied.svg';
import chairSelected from '../assets/svg/chair-selected.svg';

const getChairType = (placeName, isAdminPage) => {
  if (isAdminPage) {
    if (placeName === 'standart') {
      return chair;
    }

    if (placeName === 'vip') {
      return chairVip;
    }

    if (placeName === 'disabled') {
      return chairNone;
    }
  } else {
    if (placeName === 'standart') {
      return chairFree;
    }

    if (placeName === 'vip') {
      return chairFreeVip;
    }

    if (placeName === 'taken') {
      return chairOccupied;
    }

    if (placeName === 'selectedStandart' || placeName === 'selectedVip') {
      return chairSelected;
    }
  }
};

const onChangePlace = (event, setHallConfig, isAdminPage) => {
  let currentChair = event.currentTarget;

  if (isAdminPage) {
    if (currentChair.name === 'standart') {
      currentChair.src = chairVip;
      currentChair.name = 'vip';
    } else if (currentChair.name === 'vip') {
      currentChair.src = chairNone;
      currentChair.name = 'disabled';
    } else if (currentChair.name === 'disabled') {
      currentChair.src = chair;
      currentChair.name = 'standart';
    }

    const newHallConfig = getHallConfigArr();
    setHallConfig(newHallConfig);
  } else {
    if (currentChair.name === 'standart') {
      currentChair.src = chairSelected;
      currentChair.name = 'selectedStandart';
      currentChair.classList.add('scheme__chair-img_selected');
    } else if (currentChair.name === 'vip') {
      currentChair.src = chairSelected;
      currentChair.name = 'selectedVip';
      currentChair.classList.add('scheme__chair-img_selected');
    } else if (currentChair.name === 'selectedStandart') {
      currentChair.src = chairFree;
      currentChair.name = 'standart';
      currentChair.classList.remove('scheme__chair-img_selected');
    } else if (currentChair.name === 'selectedVip') {
      currentChair.src = chairFreeVip;
      currentChair.name = 'vip';
      currentChair.classList.remove('scheme__chair-img_selected');
    }
  }
};

const getHallPlaces = (hallRow, hallPlacesCount, setHallConfig, isAdminPage) => {
  const hallPlacesArr = [];
  hallRow.forEach((placeName, index) => {
    let place;
    if (!isAdminPage && placeName === 'disabled') {
      place = (
        <div className="hall-graphic__place hall-graphic__place_disabled" name="disabled" key={index}></div>
      );
    } else if (!isAdminPage && placeName === 'taken') {
      place = (
        <img
          className="hall-graphic__place hall-graphic__place_taken"
          src={getChairType(placeName, isAdminPage)}
          name={placeName}
          key={index}
          alt="chair"
        />
      );
    } else {
      place = (
        <img
          className="hall-graphic__place"
          src={getChairType(placeName, isAdminPage)}
          name={placeName}
          onClick={event => { onChangePlace(event, setHallConfig, isAdminPage) }}
          key={index}
          alt="chair"
        />
      );
    }
    hallPlacesArr.push(place);
  });

  if (isAdminPage) {
    if (hallRow.length !== hallPlacesCount) {
      if (hallRow.length < hallPlacesCount) {
        for (let index = hallRow.length + 1; index <= hallPlacesCount; index += 1) {
          const place = (
            <img
              className="hall-graphic__place"
              src={getChairType("standart", isAdminPage)}
              name="standart"
              onClick={event => { onChangePlace(event, setHallConfig, isAdminPage) }}
              key={index}
              alt="chair"
            />
          );
          hallPlacesArr.push(place);
        }
      } else if (hallRow.length > hallPlacesCount) {
        for (let index = hallRow.length - 1; index >= hallPlacesCount; index -= 1) {
          hallPlacesArr.pop();
        }
      }
    }
  }

  return hallPlacesArr;
};

const getHallConfig = (hallConfig = [], hallRowsCount, hallPlacesCount, setHallConfig, isAdminPage) => {
  const hallRowsArr = [];
  hallConfig.forEach((hallRow, index) => {
    const row = (
      <div className={isAdminPage ? "hall-graphic__row" : "hall-graphic__row_client"} key={index}>
        {getHallPlaces(hallRow, hallPlacesCount, setHallConfig, isAdminPage)}
      </div>
    );
    hallRowsArr.push(row);
  });

  if (isAdminPage) {
    if (hallConfig.length !== hallRowsCount) {
      if (hallConfig.length < hallRowsCount) {
        const hallRow = [];
        for (let index = 0; index < hallPlacesCount; index += 1) {
          hallRow.push('standart');
        }

        for (let index = hallConfig.length + 1; index <= hallRowsCount; index += 1) {
          const row = (
            <div className="hall-graphic__row" key={index}>
              {getHallPlaces(hallRow, hallPlacesCount, setHallConfig, isAdminPage)}
            </div>
          );
          hallRowsArr.push(row);
        }
      } else if (hallConfig.length > hallRowsCount) {
        for (let index = hallConfig.length - 1; index >= hallRowsCount; index -= 1) {
          hallRowsArr.pop();
        }
      }
    }
  }

  return hallRowsArr;
};

export default getHallConfig;