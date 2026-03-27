const HallInList = ({ hall, index, idName, onClickFunc }) => {
  return (
    <div className="halls__switch-item">
      <input
        className="halls__switch-input"
        type="radio"
        id={"radio-" + idName + hall.id}
        name="hallId"
        value={hall.id ?? ""}
        defaultChecked={index === 0}
        onClick={onClickFunc}
      />

      <label
        className="halls__switch-control"
        htmlFor={"radio-" + idName + hall.id}
      >
        {hall.hall_name}
      </label>
    </div>
  );
};

export default HallInList;