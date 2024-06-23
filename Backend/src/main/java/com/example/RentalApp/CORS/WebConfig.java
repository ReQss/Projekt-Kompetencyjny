package com.example.RentalApp.CORS;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // ** oznacza wszystkie endpointy
                .allowedOrigins("http://localhost:5173") // Tutaj możesz wymienić konkretny origin, lub użyć "*" dla wszystkich
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dopuszczalne metody HTTP
                .allowedHeaders("*") // Wszystkie nagłówki
                .allowCredentials(true); // Jeśli używasz cookies lub autentyfikacji opartej na sesji
    }
}
