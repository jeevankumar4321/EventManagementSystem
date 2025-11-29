import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Registration Successful! Please Login.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Registration Failed! Email might already exist.");
        }
    };

    return (
        <div className="full-screen-center">
            <div className="card custom-card p-4" style={{ width: '450px' }}>
                <div className="card-body">
                    <h2 className="text-center fw-bold mb-2">Create Account</h2>
                    <p className="text-center text-muted mb-4">Join us to manage events</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-secondary">Full Name</label>
                            <input name="name" className="form-control form-control-lg bg-light border-0" 
                                placeholder="John Doe" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-secondary">Email Address</label>
                            <input name="email" type="email" className="form-control form-control-lg bg-light border-0" 
                                placeholder="name@example.com" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-secondary">Password</label>
                            <input name="password" type="password" className="form-control form-control-lg bg-light border-0" 
                                placeholder="••••••••" onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold text-secondary">I am a:</label>
                            <select name="role" className="form-select form-select-lg bg-light border-0" onChange={handleChange}>
                                <option value="USER">User (Attendee)</option>
                                <option value="ADMIN">Admin (Organizer)</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 btn-lg shadow">Sign Up</button>
                    </form>
                    <div className="text-center mt-3">
                        <small>Already have an account? <Link to="/login" className="text-primary fw-bold">Login here</Link></small>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;