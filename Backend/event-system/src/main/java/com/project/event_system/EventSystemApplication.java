package com.project.event_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

public class EventSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventSystemApplication.class, args);
	}

}
