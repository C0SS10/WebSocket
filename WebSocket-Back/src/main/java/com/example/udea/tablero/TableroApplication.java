package com.example.udea.tablero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Esta anotación @SpringBootApplication combina tres anotaciones:
// @Configuration, @EnableAutoConfiguration y @ComponentScan.
// Esta clase es el punto de entrada principal de la aplicación Spring Boot.
@SpringBootApplication
public class TableroApplication {

	// Método main, punto de entrada de la aplicación Spring Boot.
	public static void main(String[] args) {
		// SpringApplication.run inicia la aplicación Spring Boot pasando la clase principal
		// TableroApplication y los argumentos del programa (args) al método run.
		SpringApplication.run(TableroApplication.class, args);
	}
}