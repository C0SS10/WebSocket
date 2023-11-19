// BotonLimpia.jsx
import PropTypes from 'prop-types';

const BotonLimpia = ({ onCleanBoard }) => {
  return (
    <div>
      {/* Botón para limpiar el tablero, onClick llama a la función proporcionada */}
      <button onClick={onCleanBoard}>🧽Limpiar Tablero</button>
    </div>
  );
};

// Definir propTypes para las props del componente
BotonLimpia.propTypes = {
  onCleanBoard: PropTypes.func.isRequired, // Se espera que onCleanBoard sea una función requerida
};

export default BotonLimpia;
