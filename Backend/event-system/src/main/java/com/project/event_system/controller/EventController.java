package com.project.event_system.controller;



import com.project.event_system.entity.Event;
import com.project.event_system.entity.Registration;
import com.project.event_system.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EventController {

    @Autowired
    private EventService eventService;

    // 1. Get All Events
    @GetMapping("/events/public")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // 2. Create Event
    @PostMapping("/admin/events/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    // 3. Register for Event
    @PostMapping("/events/{id}/register")
    public ResponseEntity<String> register(@PathVariable Long id, Principal principal) {
        // "principal.getName()" gets the email from the JWT Token
        String message = eventService.registerUser(id, principal.getName());
        return ResponseEntity.ok(message);
    }
    // ... existing code ...

    @Autowired private com.project.event_system.repository.RegistrationRepository registrationRepository; // Quick injection for attendees

    // 4. ADMIN: Update Event
    @PutMapping("/admin/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    // 5. ADMIN: Delete Event
    @DeleteMapping("/admin/events/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event deleted successfully");
    }

    // 6. ADMIN: Track Attendance
    @GetMapping("/admin/events/{id}/attendees")
    public List<Registration> getAttendees(@PathVariable Long id) {
        return eventService.getEventRegistrations(id);
    }
}