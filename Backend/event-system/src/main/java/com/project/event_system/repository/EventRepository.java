package com.project.event_system.repository;



import com.project.event_system.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // Custom Search: Find events where the Location OR the Title matches the search query
    // This allows users to search "London" or "Tech Talk"
    List<Event> findByLocationContainingIgnoreCaseOrTitleContainingIgnoreCase(String location, String title);
    List<Event> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);

}