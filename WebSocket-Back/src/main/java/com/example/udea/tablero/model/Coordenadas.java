package com.example.udea.tablero.model;

// La clase Coordenadas representa las coordenadas (x, y) con un color asociado
public record Coordenadas(double x, double y, String color) {
    // Esta clase se define como un "record" en Java, que es una característica
    // introducida en Java 14 para definir clases inmutables de forma concisa.

    // Campos: x, y, y color, que son variables inmutables creadas automáticamente
    // a partir de los parámetros del constructor.

    // Comentario que describe el propósito de la clase Coordenadas y su estructura.
    // Representa un punto en un tablero con coordenadas x e y, y un color asociado.
}