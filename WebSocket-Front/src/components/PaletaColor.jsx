// PaletaColores.js
import PropTypes from 'prop-types';

// Puedes agregar más colores según tu preferencia
const colores = ['#FFFFFF', '#FFD1DC', '#FFA07A', '#87CEEB', '#98FB98', '#FFD700', '#FFB6C1', '#DDA0DD', '#00CED1', '#FF6347', '#B0E0E6', '#F5DEB3'];

const PaletaColor = ({ onSelectColor }) => {
  return (
    <>
      {colores.map((color, index) => (
        <div
          key={index}
          className="color"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </>
  );
};

PaletaColor.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default PaletaColor;