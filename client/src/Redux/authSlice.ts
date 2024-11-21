// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the user object in the state
interface User {
  id: number;
  email: string;
  avatar?: string;
}

// Define a type for the slice state
interface AuthState {
  user: User | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to login a user, expecting a User object in the payload
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // Action to logout a user, simply setting user to null
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

// Export the actions for use in components
export const { loginUser, logoutUser } = authSlice.actions;

// Export the reducer to include in the store
export default authSlice.reducer;
