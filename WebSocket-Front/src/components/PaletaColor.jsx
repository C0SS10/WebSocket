import PropTypes from "prop-types";

// Definir una lista de colores predefinidos
const colores = [
  "#FFFFFF",
  "#C0392B",
  "#E74C3C",
  "#9B59B6",
  "#8E44AD",
  "#2C3E50",
  "#3498DB",
  "#1ABC9C",
  "#16A085",
  "#F1C40F",
  "#F39C12",
  "#D35400"
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