import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-3">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <i className="bi bi-qr-code me-2 fs-4"></i>
                    <span className="fw-bold">SCAN & SHOP</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/scan" className="nav-link px-3">
                                        <i className="bi bi-camera me-1"></i> Scan QR
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link px-3">
                                        <i className="bi bi-cart me-1"></i> Cart
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle px-3" href="#" role="button" data-bs-toggle="dropdown">
                                        <i className="bi bi-person-circle me-1"></i> {user.username}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button
                                                onClick={logout}
                                                className="dropdown-item text-danger"
                                            >
                                                <i className="bi bi-box-arrow-right me-1"></i> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link px-3">
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link btn btn-outline-light ms-2 px-3">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
