package com.project.event_system.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // User can send "USER" or "ADMIN"
}
