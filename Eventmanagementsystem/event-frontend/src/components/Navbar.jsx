import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        // Added 'shadow-sm' and changed background to white for contrast against the colorful body
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
                    🚀 EventMaster
                </Link>
                
                {/* This button handles mobile menu collapsing */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="navbar-nav align-items-center">
                        {!token ? (
                            <>
                                <Link className="btn btn-outline-primary rounded-pill me-2 px-4" to="/login">Login</Link>
                                <Link className="btn btn-primary rounded-pill px-4" to="/register">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link fw-semibold me-3 text-dark" to="/dashboard">Browse Events</Link>
                                {role === 'ADMIN' && (
                                    <Link className="btn btn-outline-warning rounded-pill me-3" to="/create-event">+ Create Event</Link>
                                )}
                                <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;