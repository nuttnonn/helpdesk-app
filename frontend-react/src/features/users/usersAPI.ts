import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import {
    RegisterUserRequest,
    RegisterUserSuccess,
    RegisterUserFailed,
    FetchUserRequest,
    FetchUserRequestFailed,
    FetchUserRequestSuccess,
    UpdateUserFailed,
    UpdateUserRequest,
    UpdateUserSuccess,
} from "./usersTypes.ts";

export const useRegisterUser = (
    onSuccess?: () => void,
    onError?: (error: RegisterUserFailed) => void
): UseMutationResult<RegisterUserSuccess, RegisterUserFailed, RegisterUserRequest> => {
    const registerUserAPI = async (request: RegisterUserRequest): Promise<RegisterUserSuccess> => {
        try {
            const response = await axiosInstance.post("/users/register", request);
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

export const useFetchUserById = (
    onSuccess?: () => void,
    onError?: (error: FetchUserRequestFailed) => void
): UseMutationResult<FetchUserRequestSuccess, FetchUserRequestFailed, FetchUserRequest> => {
    const fetchUserByIdAPI = async (request: FetchUserRequest): Promise<FetchUserRequestSuccess> => {
        try {
            const response = await axiosInstance.get(`/users/${request.id}`);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<FetchUserRequestFailed>;
            throw axiosError.response.data;
        }
    };

    return useMutation({
        mutationFn: fetchUserByIdAPI,
        onSuccess,
        onError,
    });
}

export const useUpdateUser = (
    onSuccess?: () => void,
    onError?: (error: UpdateUserFailed) => void
): UseMutationResult<UpdateUserSuccess, UpdateUserFailed, UpdateUserRequest> => {
    const updateUserAPI = async (request: UpdateUserRequest): Promise<UpdateUserSuccess> => {
        try {
            const response = await axiosInstance.patch(`/users/${request.id}`, request);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<UpdateUserFailed>;
            throw axiosError.response.data;
        }
    };

    return useMutation({
        mutationFn: updateUserAPI,
        onSuccess,
        onError,
    });
};