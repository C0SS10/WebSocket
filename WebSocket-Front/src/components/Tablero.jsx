import { useState, useRef, useEffect } from "react";
import { useOnDraw } from "./Logica";
import PaletaColor from "./PaletaColor";
import BotonLimpiar from "./BotonLimpiar";
import BotonDescarga from "./BotonDescarga";
import { Client } from "@stomp/stompjs";

const Tablero = () => {
  const [socket, setSocket] = useState(null);
  const [color, setColor] = useState("#FFFFFF");
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(enDibujo);
  const canvasRef = useRef(null);

  const initSocket = () => {
    const newSocket = new Client({
      brokerURL: 'ws://localhost:8080/ws'
    });    
  
    newSocket.onConnect = () => {
      console.log('Conexión WebSocket abierta');
      newSocket.subscribe('/tablero/coordenada', (m) => {
        const coordenada = JSON.parse(m.body);
        console.log("Coordenadas recibidas desde el servidor: ", coordenada);
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
      socket.publish({
        destination: '/app/tablero',
        body: JSON.stringify({ x: punto.x, y: punto.y }),
      });
    }
  }

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

  function manejarSeleccionColor(nuevoColor) {
    setColor(nuevoColor);
  }

  const limpiarTablero = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
