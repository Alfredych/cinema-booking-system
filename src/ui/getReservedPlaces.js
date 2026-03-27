const getReservedPlaces = (priceStandart, priceVip) => {
  const buyingScheme = document.querySelector('.scheme__config');
  const reservedPlaces = [];

  if (buyingScheme) {
    const rows = Array.from(buyingScheme.querySelectorAll('.hall-graphic__row_client'));
    rows.forEach((row, rowIndex) => {
      const places = Array.from(row.querySelectorAll('.hall-graphic__place'));
      places.forEach((place, placeIndex) => {
        if (place.name === 'selectedStandart' || place.name === 'selectedVip') {
          reservedPlaces.push({
            'row': +rowIndex + 1,
            'place': +placeIndex + 1,
            'coast': place.name === 'selectedStandart' ? priceStandart : priceVip
          });
        }
      });
    });

    return reservedPlaces;
  }
};

export default getReservedPlaces;