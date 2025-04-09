import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-body text-center p-5">
                            <h1 className="display-5 fw-bold mb-4 text-primary">Scan & Shop</h1>

                            <div className="my-4">
                                <i className="bi bi-upc-scan display-1 text-success mb-4"></i>

                                <p className="lead mb-4">
                                    Scan product QR codes and add them directly to your shopping cart
                                </p>

                                {isLoggedIn ? (
                                    <Link to="/scan" className="btn btn-primary btn-lg px-5 py-3 mt-3">
                                        <i className="bi bi-camera me-2"></i> Start Scanning
                                    </Link>
                                ) : (
                                    <div className="mt-4">
                                        <p className="text-muted mb-3">Please login to start scanning products</p>
                                        <Link to="/login" className="btn btn-outline-primary me-2">
                                            <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                        </Link>
                                        <Link to="/register" className="btn btn-primary">
                                            <i className="bi bi-person-plus me-1"></i> Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
