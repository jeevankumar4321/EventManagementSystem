package com.project.event_system.repository;



import com.project.event_system.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    // Check if a specific user is already registered for a specific event
    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    // Get all registrations for a specific user (My Events)
    List<Registration> findByEventId(Long eventId);
}
