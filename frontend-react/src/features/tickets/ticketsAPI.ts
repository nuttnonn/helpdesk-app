import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { Ticket, CreateTicketRequest, UpdateTicketRequest, ReorderTicketRequest } from "./ticketsTypes.ts";

export const useFetchTickets = () => {
    return useQuery<Ticket[], AxiosError>({
        queryKey: ["tickets"],
        queryFn: async () => {
            const response = await axiosInstance.get("/tickets");
            return response.data;
        },
    });
};

export const useFetchTicketsById = (ticketId?: Ticket['id']) => {
    return useQuery<Ticket, AxiosError>({
        queryKey: ["ticket", ticketId],
        queryFn: async (): Promise<Ticket> => {
            if (!ticketId) throw new Error("Ticket ID is required");
            const response = await axiosInstance.get(`/tickets/${ticketId}`);
            return response.data;
        },
        enabled: Boolean(ticketId),
    });
};

export const useCreateTicket = (
    onSuccess?: () => void,
    onError?: (error: AxiosError) => void
): UseMutationResult<Ticket, AxiosError, CreateTicketRequest> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateTicketRequest) => {
            const response = await axiosInstance.post("/tickets", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            if (onSuccess) onSuccess();
        },
    });
};

export const useUpdateTicket = (
    onSuccess?: () => void,
    onError?: (error: AxiosError) => void
): UseMutationResult<Ticket, AxiosError, UpdateTicketRequest> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateTicketRequest) => {
            const response = await axiosInstance.patch(`/tickets/${data.id}`, {
                ...data,
                updatedAt: new Date().toISOString(),
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            if (onSuccess) onSuccess();
        },
        onError,
    });
};

export const useReorderTicket = (
    onSuccess?: () => void,
    onError?: (error: AxiosError) => void
): UseMutationResult<Ticket, AxiosError, ReorderTicketRequest> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ReorderTicketRequest) => {
            const payload: any = {
                status: data.status,
                order: data.order,
            };

            if (data.updatedAt) {
                payload.updatedAt = data.updatedAt;
            }

            const response = await axiosInstance.patch(`/tickets/reorder/${data.id}`, payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            if (onSuccess) onSuccess();
        },
        onError,
    });
};