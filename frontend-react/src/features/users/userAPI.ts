import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { RegisterUserRequest, RegisterUserSuccess, RegisterUserFailed } from "./types/register.ts";

export const useRegisterUser = (
    onSuccess?: () => void,
    onError?: (error: RegisterUserFailed) => void
): UseMutationResult<RegisterUserSuccess, RegisterUserFailed, RegisterUserRequest> => {
    const registerUserAPI = async (data: RegisterUserRequest): Promise<RegisterUserSuccess> => {
        try {
            const response = await axiosInstance.post("/users/register", data);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<RegisterUserFailed>;
            throw axiosError.response.data;
        }
    };

    return useMutation({
        mutationFn: registerUserAPI,
        onSuccess,
        onError,
    });
};