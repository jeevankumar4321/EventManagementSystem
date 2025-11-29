package com.project.event_system.service;



import com.project.event_system.entity.Event;
import com.project.event_system.entity.Registration;
import com.project.event_system.entity.User;
import com.project.event_system.repository.EventRepository;
import com.project.event_system.repository.RegistrationRepository;
import com.project.event_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired private EventRepository eventRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RegistrationRepository registrationRepository;
    @Autowired private EmailService emailService;

    // --- MISSING METHOD 1: Get All Events ---
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // --- MISSING METHOD 2: Create Event ---
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // --- METHOD 3: Register User (With Email) ---
    public String registerUser(Long eventId, String userEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (registrationRepository.existsByUserIdAndEventId(user.getId(), event.getId())) {
            return "You are already registered!";
        }



        Registration registration = new Registration();
        registration.setEvent(event);
        registration.setUser(user);
        registrationRepository.save(registration);

        // Send Email
        String subject = "Registration Confirmed: " + event.getTitle();
        String body = "Hello " + user.getName() + ",\n\n" +
                "You have successfully registered for " + event.getTitle() + ".\n" +
                "Location: " + event.getLocation() + "\n" +
                "Time: " + event.getDateTime() + "\n\n" +
                "See you there!";

        emailService.sendEmail(user.getEmail(), subject, body);

        return "Successfully registered! Check your email.";
    }
    // ... existing code ...

    // 4. Update Event
    public Event updateEvent(Long id, Event updatedEvent) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setLocation(updatedEvent.getLocation());
        event.setDateTime(updatedEvent.getDateTime());
        event.setSpeaker(updatedEvent.getSpeaker()); // Manage Speaker

        return eventRepository.save(event);
    }

    // 5. Delete Event
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // 6. Get Attendees (Track Attendance)
    public List<Registration> getEventRegistrations(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }
}
