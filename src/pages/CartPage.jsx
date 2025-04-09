import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, submitOrder, getTotalPrice } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const navigate = useNavigate();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) newQuantity = 1;
        updateQuantity(productId, parseInt(newQuantity));
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setIsSubmitting(true);
        setOrderError(null);

        const result = await submitOrder();

        if (result.success) {
            setOrderSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            setOrderError(result.message || 'Error creating order');
        }

        setIsSubmitting(false);
    };

    if (orderSuccess) {
        return (
            <div className="container-sm mt-5" style={{ maxWidth: '800px' }}>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Order confirmed!</h4>
                    <p>Your order has been successfully created.</p>
                    <hr />
                    <p className="mb-0">You will be redirected to the home page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-sm mt-4" style={{ maxWidth: '800px' }}>
            <h1 className="mb-4">My Cart</h1>

            {orderError && (
                <div className="alert alert-danger" role="alert">
                    {orderError}
                </div>
            )}

            {cartItems.length === 0 ? (
                <div className="alert alert-info">
                    Your cart is empty. <a href="/scan" className="alert-link">Scan a product</a> to start shopping.
                </div>
            ) : (
                <>
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Items ({cartItems.length})</h5>
                        </div>
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                                {cartItems.map((item) => (
                                    <li key={item.product.id} className="list-group-item py-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-2">
                                                {item.product.image && (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="img-thumbnail"
                                                    />
                                                )}
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="mb-1">{item.product.name}</h5>
                                                <p className="text-muted small mb-0">{item.product.description}</p>
                                            </div>
                                            <div className="col-md-2 text-center">
                                                <span className="fw-bold">{item.product.price} €</span>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control text-center"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                                                        min="1"
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Total</h5>
                                <h5 className="mb-0">{getTotalPrice().toFixed(2)} €</h5>
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-success"
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        'Confirm my order'
                                    )}
                                </button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={clearCart}
                                    disabled={isSubmitting}
                                >
                                    Empty cart
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
