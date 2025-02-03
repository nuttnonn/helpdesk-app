export interface User {
    id: number;
    email: string;
    name: string;
}

export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserSuccess {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserFailed {
    message: string;
    error: string;
    statusCode: number;
}

export interface FetchUserRequest {
    id: number;
}

export interface FetchUserRequestSuccess {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface FetchUserRequestFailed {
    message: string;
    error: string;
    statusCode: number;
}

export interface UpdateUserRequest {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserSuccess {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserFailed {
    message: string;
    error: string;
    statusCode: number;
}