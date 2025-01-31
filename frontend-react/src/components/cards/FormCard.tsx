import React from 'react';

interface FormCardProps {
    children: React.ReactNode;
    title: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, title }) => {
    return (
        <div className="w-full max-w-96 p-8 flex flex-col justify-start items-center gap-2 bg-surface rounded-xl">
            <h2 className="mb-4 text-primary font-bold text-center">{title}</h2>
            {children}
        </div>
    );
};

export default FormCard;