// BotonLimpia.jsx
import PropTypes from 'prop-types';

const BotonLimpia = ({ onCleanBoard }) => {
  return (
    <div>
      <button onClick={onCleanBoard}>Limpiar Tablero</button>
    </div>
  );
};

BotonLimpia.propTypes = {
  onCleanBoard: PropTypes.func.isRequired,
};

export default BotonLimpia;