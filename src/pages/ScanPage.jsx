import React,{ useState } from 'react';
import QRScanner from '../components/QRScanner';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleScanSuccess = async (data) => {
        try {
            if (!data || !data.id || !data.name || !data.price) {
                setError("Invalid QR code. Please scan a valid product code.");
                return;
            }

            addToCart(data);
            setScanResult(data);
            setError(null);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000);

        } catch (err) {
            setError("Error processing QR code");
            console.error(err);
        }
    };

    const goToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="text-center mb-4">Scan a product</h2>

                    <div className="card shadow-sm border-0 rounded-4 mb-3">
                        <div className="card-body p-3">
                            {error && (
                                <div className="alert alert-danger py-2 mb-3" role="alert">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success py-2 mb-3" role="alert">
                                    Product added to cart!
                                </div>
                            )}

                            {!scanResult ? (
                                <div className="scanner-container mb-3">
                                    <QRScanner onScanSuccess={handleScanSuccess} />
                                </div>
                            ) : (
                                <div className="scanned-product p-3 bg-light rounded-3 mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0">{scanResult.name}</h6>
                                        <span className="badge bg-primary">{scanResult.price} €</span>
                                    </div>
                                    {scanResult.description && (
                                        <p className="text-muted small mb-3">{scanResult.description}</p>
                                    )}
                                    <button
                                        onClick={() => setScanResult(null)}
                                        className="btn btn-secondary  w-100"
                                    >
                                        Scan another product
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={goToCart}
                                className="btn btn-primary w-100"
                            >
                                View my cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanPage;
