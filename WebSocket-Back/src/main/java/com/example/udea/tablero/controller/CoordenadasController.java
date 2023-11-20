package com.example.udea.tablero.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.udea.tablero.model.Coordenadas;

@Controller
@CrossOrigin(origins = "*")
public class CoordenadasController {

    @MessageMapping("/tablero")
    @SendTo("/tablero/coordenadas")
    public Coordenadas enviarCoordenadas(Coordenadas coordenadas) {
        return coordenadas;
    }
}
