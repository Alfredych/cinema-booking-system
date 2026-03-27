const getReservationCode = (event, ticketData, navigate) => {
  event.preventDefault();
  const idArr = [];
  ticketData.map(item => idArr.push(item.id));
  const urlId = idArr.join('&');
  navigate('/ticket/' + urlId, { state: ticketData });
};

export default getReservationCode;