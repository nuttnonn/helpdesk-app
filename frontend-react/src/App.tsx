import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from './routes/PublicRoute.tsx';
import LoginPage from "./pages/Login";
import RegisterPage from './pages/Register.tsx';
import HomePage from './pages/Home.tsx';

const App = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    )
}

export default App