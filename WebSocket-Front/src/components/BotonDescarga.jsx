// BotonDescarga.js
import { useState } from 'react';
import PropTypes from 'prop-types';

const BotonDescarga = ({ canvasRef }) => {
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
    }
  };

  return (
    <div>
      <button onClick={generateImage}>Descargar Imagen</button>
      {imageURL && (
        <div>
          <h3>Vista previa:</h3>
          <img src={imageURL} alt="Tablero" />
        </div>
      )}
    </div>
  );
};

BotonDescarga.propTypes = {
  canvasRef: PropTypes.object.isRequired,
};

export default BotonDescarga;