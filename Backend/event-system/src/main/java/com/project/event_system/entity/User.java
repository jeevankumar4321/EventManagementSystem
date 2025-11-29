package com.project.event_system.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity // Tells Hibernate: "Make a table called 'user' out of this class"
@Data   // Lombok: Automatically creates Getters, Setters, and toString()
@Table(name = "users") // We rename table to 'users' because 'user' is a reserved word in SQL
public class User {

    @Id // This is the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment (1, 2, 3...)
    private Long id;

    private String name;

    @Column(unique = true) // No two users can have the same email
    private String email;

    private String password;

    private String role; // We will store "ADMIN" or "USER" here
}