import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttendees } from '../services/api';

const Attendees = () => {
    const { id } = useParams();
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const res = await getAttendees(id);
                setAttendees(res.data);
            } catch (err) {
                alert("Failed to fetch attendees");
            }
        };
        fetchAttendees();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="card custom-card p-4">
                <h2 className="mb-4">Event Attendance Tracker</h2>
                {attendees.length === 0 ? (
                    <p>No registrations yet.</p>
                ) : (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendees.map((reg) => (
                                <tr key={reg.id}>
                                    <td>{reg.user.name}</td>
                                    <td>{reg.user.email}</td>
                                    <td>{new Date(reg.registrationDate).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default Attendees;