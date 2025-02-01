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