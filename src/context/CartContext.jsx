import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const { token } = useAuth();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const submitOrder = async () => {
        if (!token) {
            return {
                success: false,
                message: "You must be logged in to place an order"
            };
        }

        if (cartItems.length === 0) {
            return {
                success: false,
                message: "Your cart is empty"
            };
        }

        try {
            const API_BASE_URL = 'https://back-end-partiel.pierrenogaro.com';

            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            };

            const response = await fetch(`${API_BASE_URL}/api/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.status === 401) {
                return {
                    success: false,
                    message: "Your session has expired, please log in again"
                };
            }

            const data = await response.json();

            if (response.ok) {
                clearCart();
                return { success: true, order: data };
            } else {
                return {
                    success: false,
                    message: data.error || 'Error creating order'
                };
            }
        } catch (error) {
            console.error("Error", error);
            return {
                success: false,
                message: 'Error connecting to server'
            };
        }
    };


    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const getItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            submitOrder,
            getTotalPrice,
            getItemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
