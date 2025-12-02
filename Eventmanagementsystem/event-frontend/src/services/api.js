import axios from 'axios';

// The URL of your Spring Boot Backend
//const API_URL = "http://localhost:8080/api";

// If Vercel gives us a URL, use it. Otherwise, use localhost.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
// Replace the URL below with YOUR specific Render link
//const API_URL = "https://event-management-system-7wg6.onrender.com/api";


// Helper Function: Adds the Token to the header
const getHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// --- AUTH API ---
// Note: These use backticks (`) not quotes (')
export const loginUser = (creds) => axios.post(`${API_URL}/auth/login`, creds);
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);

// --- EVENTS API ---
export const getAllEvents = () => axios.get(`${API_URL}/events/public`);

// Admin: Create Event
export const createEvent = (eventData) => 
    axios.post(`${API_URL}/admin/events/create`, eventData, getHeader());

// User: Register for Event
export const registerForEvent = (eventId) => 
    axios.post(`${API_URL}/events/${eventId}/register`, {}, getHeader());
// ... existing code ...

// Delete Event
export const deleteEvent = (id) => 
    axios.delete(`${API_URL}/admin/events/${id}`, getHeader());

// Update Event
export const updateEvent = (id, eventData) => 
    axios.put(`${API_URL}/admin/events/${id}`, eventData, getHeader());

// Get Attendees
export const getAttendees = (id) => 
    axios.get(`${API_URL}/admin/events/${id}`/attendees, getHeader());