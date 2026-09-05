import api from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    "/api/login",
    async (userData, { rejectWithValue }) => {
        try {
            const data = await api.post("/api/login", userData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    "/api/register",
    async (userData, { rejectWithValue }) => {
        try {
            const data = await api.post("/api/register", userData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        loading: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;