import { useState } from 'react';
import { createEvent } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [event, setEvent] = useState({ 
        title: '', description: '', location: '', dateTime: '', category: 'Tech' 
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent(event);
            alert("Event Created Successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Failed! Are you logged in as ADMIN?");
        }
    };

    return (
        <div className="full-screen-center">
            <div className="card custom-card p-4" style={{ width: '600px' }}>
                <h3 className="text-center mb-3">Create New Event</h3>
                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-2" placeholder="Title" required
                        onChange={e => setEvent({...event, title: e.target.value})} />
                    
                    <textarea className="form-control mb-2" placeholder="Description" required
                        onChange={e => setEvent({...event, description: e.target.value})} />
                    
                    <input className="form-control mb-2" placeholder="Location" required
                        onChange={e => setEvent({...event, location: e.target.value})} />

                    {/* NEW CATEGORY DROPDOWN */}
                    <select className="form-select mb-2" 
                        onChange={e => setEvent({...event, category: e.target.value})}>
                        <option value="Tech">Tech</option>
                        <option value="Music">Music</option>
                        <option value="Business">Business</option>
                        <option value="Art">Art</option>
                        <option value="Sports">Sports</option>
                    </select>

                    <input className="form-control mb-3" type="datetime-local" required
                        onChange={e => setEvent({...event, dateTime: e.target.value})} />
                        
                    <button className="btn btn-primary w-100">Create Event</button>
                </form>
            </div>
        </div>
    );
};
export default CreateEvent;