package com.project.event_system; // <--- CHECK YOUR PACKAGE NAME

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean; // Import
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter; // Import

import java.util.Collections;

@SpringBootApplication
@EnableScheduling
public class EventSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventSystemApplication.class, args);
    }

    // 👇 THE "NUCLEAR" CORS FIX 👇
    @Bean
    public FilterRegistrationBean<CorsFilter> simpleCorsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. Allow Credentials (cookies/tokens)
        config.setAllowCredentials(true);

        // 2. Allow ALL Origins (Vercel, Localhost, etc.) using Pattern
        // "addAllowedOriginPattern" is safer and stronger than "setAllowedOrigins"
        config.addAllowedOriginPattern("*");

        // 3. Allow ALL Headers and Methods
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/", config);

        // 4. Create the Filter
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));

        // 5. FORCE it to run FIRST (Highest Priority)
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return bean;
    }
}