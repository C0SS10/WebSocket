import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/BotonDescarga.css'; // Importar el archivo CSS externo

const BotonDescarga = ({ canvasRef, onClick }) => {
  // Estado para almacenar la URL de la imagen generada
  const [imageURL, setImageURL] = useState('');

  // Función para generar y descargar la imagen del canvas
  const generateImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      setImageURL(dataURL);

      // Crear un enlace temporal para la descarga
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'tablero.png';
      link.click();

      // Llamar a la función proporcionada en la prop onClick, si existe
      if (onClick) {
        onClick();
      }
    }
  };

  // Función para cerrar la vista previa de la imagen
  const closePreview = () => {
    setImageURL('');

    // Llamar a la función proporcionada en la prop onClick, si existe
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="boton-descarga-container">
      {/* Botón para generar y descargar la imagen */}
      <button className="boton-descarga" onClick={generateImage}>
        Descargar Imagen
      </button>

      {/* Vista previa de la imagen si está disponible */}
      {imageURL && (
        <div className="vista-previa-container">
          {/* Título de la vista previa */}
          <h3 className="vista-previa-titulo">Vista previa:</h3>

          {/* Imagen de la vista previa */}
          <img
            src={imageURL}
            alt="Tablero"
            className="vista-previa-imagen"
          />

          {/* Botón para cerrar la vista previa */}
          <button className="cerrar-vista-previa" onClick={closePreview}>
            Cerrar Vista Previa
          </button>
        </div>
      )}
    </div>
  );
};

// Definir propTypes para las props del componente
BotonDescarga.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default BotonDescarga;