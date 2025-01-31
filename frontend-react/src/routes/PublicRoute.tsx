import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;