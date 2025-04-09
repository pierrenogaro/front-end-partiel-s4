import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ScanPage from './pages/ScanPage';
import CartPage from './pages/CartPage.jsx';
import './App.css';

const RequireAuth = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/login" />;
};

function AppRoutes() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/scan" element={
                        <RequireAuth>
                            <ScanPage />
                        </RequireAuth>
                    } />
                    <Route path="/cart" element={
                        <RequireAuth>
                            <CartPage />
                        </RequireAuth>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <AppRoutes />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
