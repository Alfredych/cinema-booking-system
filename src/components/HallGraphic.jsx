import getHallConfig from '../ui/getHallConfig.jsx';

const HallGraphic = ({ hallRowsCount, hallPlacesCount, hallConfig, setHallConfig, isAdminPage }) => {
  return (
    <div className="hall-graphic">
      <h2 className="hall-graphic__title">экран</h2>
      <div className="hall-graphic__item">
        {getHallConfig(hallConfig, hallRowsCount, hallPlacesCount, setHallConfig, isAdminPage)}
      </div>
    </div>
  );
};

export default HallGraphic;