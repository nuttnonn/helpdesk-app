import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

const HomePage = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);

    return (
        <div>
            This is a home page.
        </div>
    );
};

export default HomePage;