import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (email, { rejectWithValue }) => {
        try {
            const data = await api.post("/auth/verify-email", { email });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const data = await api.post("/auth/verify-otp", { email, otp });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ email, newPassword }, { rejectWithValue }) => {
        try {
            const data = await api.post("/auth/reset-password", { email, newPassword });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        email: "",
        otpSent: false,
        otpVerified: false,
        passwordReset: false,
        message: null,
        error: null,
        loading: false
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        resetForgotPassword: (state) => {
            state.email = "";
            state.otpSent = false;
            state.otpVerified = false;
            state.passwordReset = false;
            state.message = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //verify email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.message = action.payload.msg;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.otpSent = false;
                state.error = action.payload;
            })

            //verify otp
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.otpVerified = true;
                state.message = action.payload.msg;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.otpVerified = false;
                state.error = action.payload;
            })

            //reset password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.passwordReset = true;
                state.message = action.payload.msg;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.passwordReset = false;
                state.error = action.payload;
            });
    }
});

export const { setEmail, resetForgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;