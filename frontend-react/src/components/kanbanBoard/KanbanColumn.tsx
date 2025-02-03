import React from 'react';
import { Droppable } from '@hello-pangea/dnd';

interface KanbanColumnProps {
    children: React.ReactNode;
    status: string;
    amount: number;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ children, status, amount }) => {
    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-w-[300px] min-h-[800px] p-4 flex-1 bg-primary/[0.08] rounded-md"
                >
                    <h5 className="uppercase font-semibold text-start mb-6">
                        {status} <span className="text-gray-500">({amount})</span>
                    </h5>
                    <div className="flex flex-col gap-2">
                        {children}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default KanbanColumn;