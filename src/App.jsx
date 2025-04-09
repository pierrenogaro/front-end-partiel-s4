import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ScanPage from './pages/ScanPage';
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

                    <Route path="*" element={
                        <div className="text-center py-10">
                            <h1 className="text-4xl font-bold text-red-500">404</h1>
                            <p className="text-xl mt-2">Page not found</p>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
