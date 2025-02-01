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