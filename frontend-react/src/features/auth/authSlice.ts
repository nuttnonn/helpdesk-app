import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";
import { LoginFailed, LoginRequest, LoginSuccess } from './types/login.ts';
import { User } from '../users/types/user.ts';

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: LoginFailed | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    LoginSuccess,
    LoginRequest,
    { rejectValue: LoginFailed }
>(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await loginUserAPI({ email, password });
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error as LoginFailed);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state: AuthState) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state: AuthState, action) => {
            state.loading = false;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        })
        .addCase(loginUser.rejected, (state: AuthState, action) => {
            state.loading = false;
            state.error = action.payload as LoginFailed;
        })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;