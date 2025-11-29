package com.project.event_system.service;

import com.project.event_system.entity.Event;
import com.project.event_system.entity.Registration;
import com.project.event_system.repository.EventRepository;
import com.project.event_system.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventReminderService {

    @Autowired private EventRepository eventRepository;
    @Autowired private RegistrationRepository registrationRepository;
    @Autowired private EmailService emailService;

    // This runs automatically every 30 minutes
    // cron = "Seconds Minutes Hours Day Month Year"
    @Scheduled(cron = "0 0/30 * * * *")
    public void sendEventReminders() {
        System.out.println("Checking for upcoming events...");

        // 1. Define the time range (Now to 24 Hours from now)
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime next24Hours = now.plusHours(24);

        // 2. Find events starting soon
        List<Event> upcomingEvents = eventRepository.findByDateTimeBetween(now, next24Hours);

        for (Event event : upcomingEvents) {
            System.out.println("Found upcoming event: " + event.getTitle());

            // 3. Get all people registered for this event
            List<Registration> registrations = registrationRepository.findByEventId(event.getId());

            // 4. Send Email to each person
            for (Registration reg : registrations) {
                String to = reg.getUser().getEmail();
                String subject = "Reminder: " + event.getTitle() + " is coming up!";
                String body = "Hello " + reg.getUser().getName() + ",\n\n" +
                        "This is a reminder that your event '" + event.getTitle() + "' is starting soon.\n" +
                        "Time: " + event.getDateTime() + "\n" +
                        "Location: " + event.getLocation() + "\n\n" +
                        "We look forward to seeing you!";

                // Send the email
                emailService.sendEmail(to, subject, body);
            }
        }
    }
}