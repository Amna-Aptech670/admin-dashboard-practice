import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const data = await api.post("/auth/login", userData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const data = await api.post("/auth/register", userData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const storedUser = localStorage.getItem('currentUser')

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        error: null,
        loading: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem('currentUser')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.check;
                state.loading = false;
                state.error = null;
                localStorage.setItem('currentUser', JSON.stringify(action.payload.check))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.addUsers;
                state.loading = false;
                state.error = null;
                localStorage.setItem('currentUser', JSON.stringify(action.payload.addUsers))
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;