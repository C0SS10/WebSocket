package com.example.udea.tablero.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Configura los brokers de mensajería
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Habilita un simple broker para la ruta "/tablero/coordenada" que permite enviar mensajes a los clientes suscritos
        config.enableSimpleBroker("/tablero/coordenada");
        // Establece el prefijo de destino de la aplicación para los mensajes enviados desde el cliente al servidor
        config.setApplicationDestinationPrefixes("/app");
    }

    // Registra los endpoints del punto de acceso STOMP (Simple Text Oriented Messaging Protocol)
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Registra un punto de acceso "/ws" que permite a los clientes conectarse al servidor WebSocket
        registry.addEndpoint("/ws").setAllowedOrigins("*");
    }
}
