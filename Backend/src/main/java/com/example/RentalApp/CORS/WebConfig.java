package com.example.RentalApp.CORS;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Klasa konfiguracyjna dla CORS (Cross-Origin Resource Sharing).
 * <p>
 * Ta konfiguracja umożliwia aplikacji na akceptowanie żądań z innych domen,
 * co jest szczególnie przydatne podczas pracy z aplikacjami front-end i back-end na różnych serwerach.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Konfiguruje ustawienia CORS dla całej aplikacji.
     *
     * @param registry obiekt CorsRegistry do rejestracji ustawień CORS.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // ** oznacza, że ustawienia CORS będą stosowane do wszystkich endpointów
                .allowedOrigins("http://localhost:5173") // Dopuszczalny origin (adres front-endu), może być zmieniony lub rozszerzony
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dopuszczalne metody HTTP
                .allowedHeaders("*") // Wszystkie nagłówki są dozwolone
                .allowCredentials(true); // Umożliwia uwierzytelnianie oparte na cookies lub sesji
    }
}