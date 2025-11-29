package com.project.event_system.entity;



import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many Registrations can belong to One User
    @ManyToOne
    @JoinColumn(name = "user_id") // Creates a Foreign Key column in the DB
    private User user;

    // Many Registrations can belong to One Event
    @ManyToOne
    @JoinColumn(name = "event_id") // Creates a Foreign Key column in the DB
    private Event event;

    private LocalDateTime registrationDate = LocalDateTime.now(); // Auto-sets time
}