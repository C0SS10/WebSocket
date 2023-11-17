// BotonDescarga.js
import { useState } from 'react';
import PropTypes from 'prop-types';

const BotonDescarga = ({ canvasRef, onClick }) => {
  const [imageURL, setImageURL] = useState('');

  const generateImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      setImageURL(dataURL);

      // Crear un enlace temporal
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'tablero.png';

      // Simular un clic en el enlace para iniciar la descarga
      link.click();

      // Llamar a la función proporcionada en la prop onClick, si existe
      if (onClick) {
        onClick();
      }
    }
  };

  const closePreview = () => {
    setImageURL('');

    // Llamar a la función proporcionada en la prop onClick, si existe
    if (onClick) {
      onClick();
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <button onClick={generateImage}>Descargar Imagen</button>
      {imageURL && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '5px' }}>Vista previa:</h3>
          <img
            src={imageURL}
            alt="Tablero"
            style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '5px' }}
          />
          <button onClick={closePreview} style={{ marginTop: '5px' }}>
            Cerrar Vista Previa
          </button>
        </div>
      )}
    </div>
  );
};

BotonDescarga.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  onClick: PropTypes.func, // Puedes especificar que onClick es opcional
};

export default BotonDescarga;