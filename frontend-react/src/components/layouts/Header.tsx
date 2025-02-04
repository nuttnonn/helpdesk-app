import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { setSearchTicketQuery } from '../../features/search/searchTicketSlice.ts';
import { setSearchStatuses } from '../../features/search/searchStatusSlice.ts';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { TicketStatus } from '../../features/tickets/enums/status.enum.ts';
import CreateTicketModal from '../Modals/CreateTicketModal.tsx';
import { SelectChangeEvent } from "@mui/material/Select";
import { RootState } from '../../store/store.ts';
import CustomSelectInput from '../inputs/CustomSelectInput.tsx';

const statuses: TicketStatus[] = [
    TicketStatus.PENDING,
    TicketStatus.ACCEPTED,
    TicketStatus.RESOLVED,
    TicketStatus.REJECTED,
];

const Header = () => {
    const dispatch = useDispatch();
    const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
    const selectedStatuses = useSelector((state: RootState) => state.searchStatus.statuses);

    const handleStatusChange = (event: SelectChangeEvent<typeof selectedStatuses>) => {
        const { target: { value } } = event;
        dispatch(setSearchStatuses(typeof value === "string" ? value.split(",") : value));
    };

    return (
        <div className="w-full flex justify-between items-center gap-6">
            <div className="flex justify-start items-center gap-3">
                <Input
                    placeholder="Search ticket"
                    size="large"
                    allowClear
                    variant="outlined"
                    prefix={<SearchOutlined className="text-gray-400" />}
                    className="w-80"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchTicketQuery(e.target.value))}
                />
                <CustomSelectInput
                    value={selectedStatuses}
                    onChange={handleStatusChange}
                    items={statuses}
                    placeholder="Search by status"
                />
            </div>
            <button
                onClick={() => setIsTicketModalOpen(true)}
                className="px-6 py-2 flex justify-center items-center gap-1 bg-primary border border-primary rounded-md shadow-md ease-in-out duration-300 group hover:bg-transparent hover:text-primary"
            >
                <MdAdd className="text-[24px]" /> Create Ticket
            </button>
            <CreateTicketModal
                isOpen={isTicketModalOpen}
                onCancel={() => setIsTicketModalOpen(false)}
                onSuccess={() => setIsTicketModalOpen(false)}
            />
        </div>
    );
};

export default Header;