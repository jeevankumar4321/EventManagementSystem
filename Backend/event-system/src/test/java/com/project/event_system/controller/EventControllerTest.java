package com.project.event_system.controller;



import com.project.event_system.entity.Event;
import com.project.event_system.service.EventService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class) // Pure JUnit 5 + Mockito (No Spring Boot Context needed)
public class EventControllerTest {

    @Mock
    private EventService eventService; // Fake the Service

    @InjectMocks
    private EventController eventController; // Inject Fake Service into Controller

    @Test
    public void testGetAllEvents() {
        // 1. Prepare Fake Data
        Event event1 = new Event();
        event1.setTitle("Java Workshop");
        List<Event> events = Arrays.asList(event1);

        // 2. Tell the Fake Service what to return
        Mockito.when(eventService.getAllEvents()).thenReturn(events);

        // 3. Call the Controller Method directly (Just like a normal Java function)
        List<Event> result = eventController.getAllEvents();

        // 4. Check the results (Assertions)
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Java Workshop", result.get(0).getTitle());
    }
}