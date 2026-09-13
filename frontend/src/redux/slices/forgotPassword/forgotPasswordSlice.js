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

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        email: "",
        otpSent: false,
        message: null,
        error: null,
        loading: false
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        resetForgotPassword: (state) => {
            state.otpSent = false;
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
                state.error = null;
                state.message = action.payload.msg;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.otpSent = false;
                state.error = action.payload;
            });
    }
});

export const { setEmail, resetForgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;