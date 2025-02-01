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