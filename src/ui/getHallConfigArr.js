const getHallConfigArr = () => {
  const hallGraphic = document.querySelector('.hall-graphic__item');
  const hallGraphicArr = [];
  const rows = Array.from(hallGraphic.querySelectorAll('.hall-graphic__row'));

  rows.forEach(row => {
    const rowArr = [];
    const places = Array.from(row.querySelectorAll('.hall-graphic__place'));
    places.forEach(place => rowArr.push(place.name));
    hallGraphicArr.push(rowArr);
  });

  return hallGraphicArr;
};

export default getHallConfigArr;