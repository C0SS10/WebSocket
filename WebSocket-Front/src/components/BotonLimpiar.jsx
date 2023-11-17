// BotonLimpia.jsx
import PropTypes from 'prop-types';

const BotonLimpia = ({ onLimpiarTablero }) => {
  return (
    <div>
      <button onClick={onLimpiarTablero}>Limpiar Tablero</button>
    </div>
  );
};

BotonLimpia.propTypes = {
  onLimpiarTablero: PropTypes.func.isRequired,
};

export default BotonLimpia;