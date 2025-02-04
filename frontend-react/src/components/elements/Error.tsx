import React from 'react';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="flex justify-center items-center h-[50dvh]">
            <p className="text-red-500 text-center">{message}</p>
        </div>
    );
};

export default Error;