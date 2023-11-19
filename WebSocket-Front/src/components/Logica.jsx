import { useEffect, useRef } from "react";

export function useOnDraw(onDraw) {
  // Referencia al elemento canvas
  const canvasRef = useRef(null);
  // Refs para el estado del dibujo
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef(null);

  // Refs para los event listeners
  const mouseMoveListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);

  // Función para establecer la referencia al canvas
  function setCanvasRef(ref) {
    canvasRef.current = ref;
  }

  // Función para manejar el evento de clic en el canvas
  function onCanvasMouseDown() {
    isDrawingRef.current = true;
  }

  // Efecto que se ejecuta al inicializar el componente o cuando cambia la función de dibujo
  useEffect(() => {
    // Función para calcular las coordenadas del punto en el canvas
    function computePointInCanvas(clientX, clientY) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      } else {
        return null;
      }
    }

    // Inicialización del event listener para el movimiento del mouse
    function initMouseMoveListener() {
      const mouseMoveListener = (e) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current.getContext("2d");
          // Llama a la función proporcionada para dibujar
          if (onDraw) onDraw(ctx, point, prevPointRef.current);
          prevPointRef.current = point;
          console.log(point);
        }
      };
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    }

    // Inicialización del event listener para el levantamiento del mouse
    function initMouseUpListener() {
      const listener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      };
      mouseUpListenerRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    // Función de limpieza para remover los event listeners al desmontar el componente
    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    }

    // Inicialización de los event listeners
    initMouseMoveListener();
    initMouseUpListener();

    // Función de limpieza que se ejecuta al desmontar el componente o cuando cambia la función de dibujo
    return () => cleanup();
  }, [onDraw]);

  // Retorna las funciones y referencias necesarias para el componente que utiliza este hook
  return {
    setCanvasRef,
    onCanvasMouseDown,
  };
}
