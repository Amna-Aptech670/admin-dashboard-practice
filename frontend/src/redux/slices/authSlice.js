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

export const fetchAllUsers = createAsyncThunk(
    "auth/users",
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get("/auth/users");
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
    users: [],
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
        //login
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

            //register
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
            })

            //get Users
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
});
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;