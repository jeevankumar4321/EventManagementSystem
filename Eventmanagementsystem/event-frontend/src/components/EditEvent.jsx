import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateEvent } from '../services/api';

const EditEvent = () => {
    const { id } = useParams();
    const location = useLocation(); // We pass data from Dashboard so we don't need to fetch again
    const navigate = useNavigate();
    
    // Initialize with existing data (passed from Dashboard)
    const [event, setEvent] = useState(location.state?.event || {
        title: '', description: '', location: '', dateTime: '', speaker: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent(id, event);
            alert("Event Updated Successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Update Failed");
        }
    };

    return (
        <div className="full-screen-center">
            <div className="card custom-card p-4" style={{ width: '600px' }}>
                <h3 className="text-center mb-3">Edit Event</h3>
                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-2" value={event.title} 
                        onChange={e => setEvent({...event, title: e.target.value})} placeholder="Title"/>
                    <textarea className="form-control mb-2" value={event.description} 
                        onChange={e => setEvent({...event, description: e.target.value})} placeholder="Description"/>
                    <input className="form-control mb-2" value={event.location} 
                        onChange={e => setEvent({...event, location: e.target.value})} placeholder="Location"/>
                    <input className="form-control mb-2" value={event.speaker} 
                        onChange={e => setEvent({...event, speaker: e.target.value})} placeholder="Speaker"/>
                    <input className="form-control mb-3" type="datetime-local" value={event.dateTime} 
                        onChange={e => setEvent({...event, dateTime: e.target.value})}/>
                    <button className="btn btn-primary w-100">Update Event</button>
                </form>
            </div>
        </div>
    );
};
export default EditEvent;