import React from 'react';
import KanbanBoard from '../components/kanbanBoard/KanbanBoard.tsx';
import Header from '../components/layouts/Header.tsx';

const HomePage = () => {
    return (
        <div className="w-screen px-8 py-28 flex flex-col justify-start items-center gap-3 overflow-x-hidden">
            <Header />
            <KanbanBoard />
        </div>
    );
};

export default HomePage;