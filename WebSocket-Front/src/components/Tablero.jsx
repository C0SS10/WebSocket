import { useState, useRef } from "react";
import { useOnDraw } from "./Logica";
import PaletaColor from "./PaletaColor";
import BotonLimpiar from "./BotonLimpiar";
import BotonDescarga from "./BotonDescarga";

const Tablero = () => {
  // Estado para almacenar el color seleccionado
  const [color, setColor] = useState("#FFFFFF");

  // Obtener referencias y funciones desde el hook useOnDraw
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(enDibujo);
  
  // Referencia al canvas
  const canvasRef = useRef(null);

  // Función que se ejecuta cuando se dibuja en el canvas
  function enDibujo(ctx, punto, antPunto) {
    // Llamar a la función para dibujar una línea
    dibujarLinea(antPunto, punto, ctx, color, 6);
  }

  // Función para dibujar una línea en el canvas
  function dibujarLinea(inicio, fin, ctx, color, width) {
    inicio = inicio ?? fin;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(inicio.x, inicio.y);
    ctx.lineTo(fin.x, fin.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(inicio.x, inicio.y, width / 2, 0, 2 * Math.PI);
    ctx.closePath();
  }

  // Función para manejar la selección de color desde la paleta
  function manejarSeleccionColor(nuevoColor) {
    setColor(nuevoColor);
  }

  // Función para limpiar el contenido del tablero (canvas)
  const limpiarTablero = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      console.log("Limpiando el tablero...");
    }
  };

  return (
    <>
      {/* Canvas donde se dibujará */}
      <canvas
        className="tablero"
        width={800}
        height={600}
        ref={(ref) => {
          // Establecer la referencia del canvas
          setCanvasRef(ref);
          // Asignar la referencia al canvasRef
          canvasRef.current = ref;
        }}
        onMouseDown={onCanvasMouseDown}
      />
      
      {/* Componente de la paleta de colores */}
      <PaletaColor onSelectColor={manejarSeleccionColor} />

      {/* Botón para limpiar el tablero */}
      <BotonLimpiar onCleanBoard={limpiarTablero} />

      {/* Botón para descargar el contenido del tablero como imagen */}
      <BotonDescarga canvasRef={{ current: canvasRef.current }} />
    </>
  );
};

export default Tablero;