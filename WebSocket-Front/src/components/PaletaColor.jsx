import PropTypes from "prop-types";

// Definir una lista de colores predefinidos
const colores = [
  "#FFFFFF",
  "#FFD1DC",
  "#FFA07A",
  "#87CEEB",
  "#98FB98",
  "#FFD700",
  "#FFB6C1",
  "#DDA0DD",
  "#00CED1",
  "#FF6347",
  "#B0E0E6",
  "#F5DEB3"
];

// Componente funcional PaletaColor
const PaletaColor = ({ onSelectColor }) => {
  return (
    // Contenedor de la paleta con la clase "paleta-container"
    <div className="paleta-container">
      {/* Mapeo de la lista de colores para crear botones de color */}
      {colores.map((color, index) => (
        <div
          key={index}
          className="color" // Clase para el botón de color
          style={{ backgroundColor: color }} // Establecer el color de fondo según el color actual
          onClick={() => onSelectColor(color)} // Manejador de clic que llama a la función onSelectColor con el color seleccionado
        />
      ))}
    </div>
  );
};

// Especificar los propTypes para el componente
PaletaColor.propTypes = {
  onSelectColor: PropTypes.func.isRequired // onSelectColor debe ser una función requerida
};

export default PaletaColor; // Exportar el componente