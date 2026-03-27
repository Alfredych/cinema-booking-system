const cancelHallConfig = (event, data, hallConfigId, setHallRowsCount, setHallPlacesCount, setHallConfig, hallConfig) => {
  event.preventDefault();
  const form = event.currentTarget.closest('form');
  const prevHallValues = data.halls.find(hall => hall.id === +hallConfigId);
  const prevRowsCount = prevHallValues?.hall_rows ?? form.rowCount.value;
  const prevPlacesCount = prevHallValues?.hall_places ?? form.placeCount.value;
  const prevHallConfig = prevHallValues?.hall_config ?? hallConfig;

  form.rowCount.value = prevRowsCount;
  form.placeCount.value = prevPlacesCount;
  setHallConfig(prevHallConfig);
  setHallRowsCount(prevRowsCount);
  setHallPlacesCount(prevPlacesCount);
};

export default cancelHallConfig;