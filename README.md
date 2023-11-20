# Tablero Virtual 🎨
Este proyecto implementa un tablero virtual interactivo en tiempo real utilizando Java Spring Boot para el backend y React-JavaScript para el frontend.

## Funcionalidades
- Dibuja en la pizarra en tiempo real con varios usuarios.
- Cambia el color del lápiz con una paleta de colores 🌈.
- Limpia la pizarra con un solo clic 🧹.
- Descarga la imagen rayada en el tablero con un botón 📥.

## Tecnologías Utilizadas

### Frontend
- **React-JavaScript**: Framework para construir interfaces de usuario interactivas.
- **@stomp/stompjs**: Librería para la comunicación en tiempo real con el servidor.

### Backend
- **Java Spring Boot**: Framework para el desarrollo de aplicaciones Java.
- **WebSocket**: Protocolo de comunicación bidireccional en tiempo real.

## Instalación
1. Clona el repositorio:

   ```PowerShell
   git clone https://github.com/E-CG/WebSocket.git
   cd WebSocket

   cd WebSocket-Back
   ./mvnw spring-boot:run

   cd WebSocket-Front
   npm install
   npm run dev

El Front se ejecuta en [localhost:5173 ‼️](http://localhost:5173/)
El Back se ejecuta en [localhost:8080 👀](http://localhost:8080/)
