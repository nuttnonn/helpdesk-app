import React from 'react';
import Navbar from './Navbar.tsx';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="w-screen min-h-screen">
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;