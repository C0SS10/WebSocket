package com.example.udea.tablero.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.udea.tablero.model.Datos;

@Controller
public class CoordenadasController {

    @MessageMapping("/tablero")
    @SendTo("/tablero/coordenada")
    public Datos enviarCoordenadas(Datos datos) {
        return datos;
    }
}
