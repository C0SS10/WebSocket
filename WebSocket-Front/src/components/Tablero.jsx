import { useState, useRef, useEffect } from "react";
import { useOnDraw } from "./Logica";
import PaletaColor from "./PaletaColor";
import BotonLimpiar from "./BotonLimpiar";
import BotonDescarga from "./BotonDescarga";
import { Client } from "@stomp/stompjs";

const Tablero = () => {
  const [socket, setSocket] = useState(null);
  const [color, setColor] = useState("#FFFFFF");
  const [receivedCoordinates, setReceivedCoordinates] = useState([]);
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(enDibujo);
  const canvasRef = useRef(null);

  const initSocket = () => {
    const newSocket = new Client({
      brokerURL: "ws://localhost:8080/ws",
    });

    newSocket.onConnect = () => {
      console.log("Conexión WebSocket abierta");
      newSocket.subscribe("/tablero/coordenada", (m) => {
        const coordenada = JSON.parse(m.body);
        console.log("Coordenadas recibidas desde el servidor: ", coordenada);
        // Actualizar el estado con las nuevas coordenadas
        setReceivedCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          coordenada,
        ]);
      });
    };

    newSocket.activate();
    return newSocket;
  };

  const cleanupSocket = (socket) => {
    if (socket) {
      socket.deactivate();
    }
  };

  useEffect(() => {
    const newSocket = initSocket();
    setSocket(newSocket);

    return () => {
      cleanupSocket(newSocket);
    };
  }, []);

  function enDibujo(ctx, punto, antPunto) {
    dibujarLinea(antPunto, punto, ctx, color, 6);

    if (socket && socket.connected) {
      console.log("Enviando coordenadas al servidor...");
      socket.publish({
        destination: "/app/tablero",
        body: JSON.stringify({ x: punto.x, y: punto.y, color }),
      });
    } else {
      console.error("La conexión WebSocket no está activa");
    }

    // Agregar solo la última coordenada al estado
    setReceivedCoordinates([{ x: punto.x, y: punto.y, color }]);
  }

  useEffect(() => {
    if (socket && socket.connected) {
      const ctx = canvasRef.current.getContext("2d");
      const lastCoord = receivedCoordinates[receivedCoordinates.length - 1];
      if (lastCoord) {
        const start =
          receivedCoordinates.length > 1
            ? receivedCoordinates[receivedCoordinates.length - 2]
            : null;
        if (start) {
          dibujarLinea(start, lastCoord, ctx, lastCoord.color, 6);
        } else {
          // Dibuja un punto si no hay coordenadas anteriores
          dibujarLinea(lastCoord, lastCoord, ctx, lastCoord.color, 6);
        }
      }
    }
  }, [receivedCoordinates, socket]);

  function dibujarLinea(inicio, fin, ctx, color, width) {
    if (!inicio) {
      return;
    }
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(inicio.x, inicio.y);
    ctx.lineTo(fin.x, fin.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(inicio.x, inicio.y, width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  function manejarSeleccionColor(nuevoColor) {
    setColor(nuevoColor);
  }

  const limpiarTablero = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setReceivedCoordinates([]);
      console.log("Limpiando el tablero...");
    }
  };

  return (
    <>
      <canvas
        className="tablero"
        width={800}
        height={600}
        ref={(ref) => {
          setCanvasRef(ref);
          canvasRef.current = ref;
        }}
        onMouseDown={onCanvasMouseDown}
      />

      <PaletaColor onSelectColor={manejarSeleccionColor} />
      <BotonLimpiar onCleanBoard={limpiarTablero} />
      <BotonDescarga canvasRef={{ current: canvasRef.current }} />
    </>
  );
};

export default Tablero;
