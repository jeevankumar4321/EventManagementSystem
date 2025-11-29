import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents, registerForEvent, deleteEvent } from '../services/api';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]); // Stores the search results
    
    // Search States
    const [searchLoc, setSearchLoc] = useState('');
    const [searchCat, setSearchCat] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        loadEvents();
    }, []);

    // Filter Logic: Runs every time a user types
    useEffect(() => {
        let result = events;

        // 1. Filter by Location (if typed)
        if (searchLoc) {
            result = result.filter(e => e.location.toLowerCase().includes(searchLoc.toLowerCase()));
        }

        // 2. Filter by Category (if selected)
        if (searchCat) {
            result = result.filter(e => e.category === searchCat);
        }

        // 3. Filter by Date (if selected)
        if (searchDate) {
            // Compare the "YYYY-MM-DD" part of the strings
            result = result.filter(e => e.dateTime.startsWith(searchDate));
        }

        setFilteredEvents(result);
    }, [searchLoc, searchCat, searchDate, events]);

    const loadEvents = async () => {
        try {
            const result = await getAllEvents();
            setEvents(result.data);
            setFilteredEvents(result.data); // Show all initially
        } catch (err) {
            console.error(err);
        }
    };

    const handleRegister = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) { alert("Please Login first!"); return; }
        try {
            const response = await registerForEvent(id);
            alert(response.data);
        } catch (error) {
            alert("Registration failed.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Delete this event?")) {
            try {
                await deleteEvent(id);
                loadEvents(); 
            } catch(err) { alert("Failed to delete"); }
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center text-white mb-4">
                <h1 className="fw-bold display-5">Find Your Next Event</h1>
            </div>

            {/* --- SEARCH BAR SECTION --- */}
            <div className="card p-3 mb-5 shadow-sm">
                <div className="row g-2">
                    <div className="col-md-4">
                        <input className="form-control" placeholder="🔍 Search by Location..." 
                            onChange={e => setSearchLoc(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" onChange={e => setSearchCat(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="Tech">Tech</option>
                            <option value="Music">Music</option>
                            <option value="Business">Business</option>
                            <option value="Art">Art</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <input type="date" className="form-control" 
                            onChange={e => setSearchDate(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* --- EVENTS GRID --- */}
            <div className="row">
                {filteredEvents.length === 0 ? (
                    <div className="text-center text-white"><h3>No events found 😢</h3></div>
                ) : (
                    filteredEvents.map(event => (
                        <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card custom-card h-100">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h4 className="card-title fw-bold text-dark">{event.title}</h4>
                                        <span className="badge bg-warning text-dark">{event.category || 'General'}</span>
                                    </div>
                                    <p className="text-muted small">📍 {event.location}</p>
                                    <p className="card-text flex-grow-1">{event.description}</p>
                                    
                                    <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                                        <small className="text-primary fw-bold">
                                            📅 {new Date(event.dateTime).toLocaleDateString()}
                                        </small>

                                        {role === 'ADMIN' ? (
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-info btn-sm" onClick={() => navigate(`/attendees/${event.id}`)}>👥</button>
                                                <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-event/${event.id}`, { state: { event } })}>✏</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>🗑</button>
                                            </div>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={() => handleRegister(event.id)}>Register</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default Dashboard;