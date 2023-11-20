package com.example.udea.tablero.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.udea.tablero.model.Coordenadas;

// Esta clase es un controlador de Spring MVC que maneja las peticiones relacionadas con las coordenadas.
@Controller
public class CoordenadasController {

    // La anotación @MessageMapping indica el mapeo de la URL a la cual se debe suscribir este método cuando
    // se recibe un mensaje en el destino "/tablero".
    // La anotación @SendTo especifica el destino al que se enviará el resultado de este método.
    @MessageMapping("/tablero")
    @SendTo("/tablero/coordenada")
    public Coordenadas enviarCoordenadas(Coordenadas coordenadas) {
        // Este método recibe coordenadas desde el cliente y las devuelve de nuevo a los clientes suscritos
        // a "/tablero/coordenada", lo cual permite que otros clientes reciban estas coordenadas actualizadas.
        return coordenadas;
    }
}