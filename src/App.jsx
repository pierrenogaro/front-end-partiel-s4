import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Fonction pour vérifier l'authentification directement dans le composant
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
                    {/* Routes publiques */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Routes protégées */}
                    <Route path="/dashboard" element={
                        <RequireAuth>
                            <div className="p-4 bg-white rounded shadow">
                                <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
                                <p>Bienvenue sur votre espace personnel</p>
                            </div>
                        </RequireAuth>
                    } />

                    {/* Page 404 */}
                    <Route path="*" element={
                        <div className="text-center py-10">
                            <h1 className="text-4xl font-bold text-red-500">404</h1>
                            <p className="text-xl mt-2">Page non trouvée</p>
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
