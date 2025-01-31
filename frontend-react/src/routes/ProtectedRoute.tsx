import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from '../components/layouts/Layout.tsx';

const ProtectedRoute = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    return token ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Navigate to="/login" />
    );
}

export default ProtectedRoute;