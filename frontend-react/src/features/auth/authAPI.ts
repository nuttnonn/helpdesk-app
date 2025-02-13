import axiosInstance from "../../api/axiosInstance";
import { LoginRequest, LoginFailed, LoginSuccess } from './authTypes.ts';

export const loginUserAPI = async ({ email, password }: LoginRequest): Promise<LoginSuccess> => {
    try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response?.data as LoginFailed;
    }
};