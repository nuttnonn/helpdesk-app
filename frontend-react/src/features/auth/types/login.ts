import { User } from '../../users/types/user.ts';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginSuccess {
    accessToken: string;
    user: User;
}

export interface LoginFailed {
    message: string;
    error: string;
    statusCode: number;
}