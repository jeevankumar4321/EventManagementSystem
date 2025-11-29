package com.project.event_system.entity;



import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id;

    private String title;

    // @Lob allows storing large text if the description is long
    @Lob
    private String description;

    private String location;

    private LocalDateTime dateTime; // Stores Date AND Time

    private String speaker;

    private String category;
}