import React, { useMemo } from "react";
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { useFetchTickets } from '../../features/tickets/ticketsAPI.ts';
import { TicketStatus } from "../../features/tickets/enums/status.enum";
import Error from '../elements/Error.tsx';

const palette = ['#355070', '#f4b886', '#6c9a8b', '#e56b6f'];

const TicketPieChart = () => {
    const { data: tickets, isError, isSuccess } = useFetchTickets();

    const pieChartData = useMemo(() => {
        if (!isSuccess || !tickets) return [];

        const statusCounts = {
            [TicketStatus.PENDING]: 0,
            [TicketStatus.ACCEPTED]: 0,
            [TicketStatus.RESOLVED]: 0,
            [TicketStatus.REJECTED]: 0,
        };

        tickets.forEach((ticket) => {
            statusCounts[ticket.status] = (statusCounts[ticket.status] || 0) + 1;
        });

        return Object.entries(statusCounts).map(([status, count], index) => ({
            id: status,
            value: count as number,
            label: status.charAt(0).toUpperCase() + status.slice(1),
            color: palette[index],
        }));
    }, [tickets, isSuccess]);

    if (isError) return <Error message="Failed to load tickets" />;

    return (
        <div className="w-full flex justify-end items-center">
            <PieChart
                series={[{
                    data: pieChartData,
                    innerRadius: 10,
                    outerRadius: 120,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                }]}
                width={500}
                height={300}
                sx={{
                    "& .MuiChartsLegend-series text": {
                        fill: '#FFFFFF !important',
                        fontSize: '16px !important',
                        fontWeight: '500 !important',
                        letterSpacing: '0.06rem !important',
                    },
                }}
            />
        </div>
    );
};

export default TicketPieChart;