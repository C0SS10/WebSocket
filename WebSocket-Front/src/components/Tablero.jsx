import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BotonDescarga from "./BotonDescarga";
import BotonLimpiar from "./BotonLimpiar";
import PaletaColor from "./PaletaColor";

const Tablero = ({ socket }) => {
  const [dibujo, setDibujo] = useState([]);
  const [color, setColor] = useState("#FFFFFF"); // Corregido aquí
  const canvasRef = useRef(null);

  useEffect(() => {
    // Escuchar los eventos del servidor para actualizar el dibujo
    socket.on("actualizarTablero", (nuevoTablero) => {
      setDibujo(nuevoTablero);
    });

    // Limpieza del efecto al desmontar el componente
    return () => {
      socket.off("actualizarTablero");
    };
  }, [socket]);

  // Lógica para manejar los clicks en el tablero
  const manejarClicks = (event) => {
    const punto = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
    socket.emit("clickTablero", punto);
  };

  const manejarDescarga = () => {
    // Lógica para solicitar la descarga al servidor
    socket.emit("descargarImagen");
  };

  const manejarLimpiarTablero = () => {
    setDibujo([]);
  };

  const manejarSeleccionColor = (nuevoColor) => {
    setColor(nuevoColor);
  };

  return (
    <div onClick={manejarClicks} className="tablero-contenedor">
      <svg width="900" height="600" style={{ border: "4px solid white" }}>
        {/* Lógica para renderizar el dibujo */}
        {dibujo.map((punto, index) => (
          <circle key={index} cx={punto.x} cy={punto.y} r="3" fill={color} />
        ))}
      </svg>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ display: "none" }}
      />
      <BotonDescarga canvasRef={canvasRef} onClick={manejarDescarga} />
      <BotonLimpiar onCleanBoard={manejarLimpiarTablero} />
      <div className="paleta-color-container"> {/* Corregido aquí */}
        <PaletaColor onSelectColor={manejarSeleccionColor} />
      </div>
    </div>
  );
};

Tablero.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default Tablero;