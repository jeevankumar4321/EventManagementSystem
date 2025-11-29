import { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser({ email, password });
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);
            navigate("/dashboard");
        } catch (error) {
            alert("Login Failed! Check credentials.");
        }
    };

    return (
        // This class forces the content to center
        <div className="full-screen-center">
            <div className="card custom-card p-4" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="text-center fw-bold mb-2">Welcome Back</h2>
                    <p className="text-center text-muted mb-4">Login to access your events</p>
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-secondary">Email Address</label>
                            <input 
                                className="form-control form-control-lg bg-light border-0" 
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold text-secondary">Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg bg-light border-0" 
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <button className="btn btn-primary w-100 btn-lg shadow">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;