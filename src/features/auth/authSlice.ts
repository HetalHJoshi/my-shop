// // src/features/auth/authSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import * as api from "../../api/authApi";

// // --- Types ---
// export interface AuthResponse {
//   user: any;
//   token: string;
// }

// export interface SignupCredentials {
//   fullName: string;
//   email: string;
//   password: string;
// }

// export interface SigninCredentials {
//   email: string;
//   password: string;
// }

// // --- Thunks ---
// // 1) Sign up
// export const signup = createAsyncThunk<void, SignupCredentials>(
//   "auth/signup",
//   async (creds, { rejectWithValue }) => {
//     try {
//       await api.register(creds);
//     } catch (err: any) {
//       return rejectWithValue(err.message || "Sign up failed");
//     }
//   }
// );

// // 2) Sign in
// export const signin = createAsyncThunk<
//   AuthResponse,
//   SigninCredentials,
//   { rejectValue: string }
// >("auth/signin", async (creds, { rejectWithValue }) => {
//   try {
//     const resp = await api.login(creds);
//     const users = resp.data as Array<{
//       id: string;
//       fullName?: string;
//       email: string;
//       password: string;
//     }>;

//     const found = users.find(
//       (u) => u.email === creds.email && u.password === creds.password
//     );
//     if (!found) {
//       return rejectWithValue("Invalid email or password");
//     }

//     return {
//       user: found,
//       token: "", // no real token here
//     };
//   } catch (err: any) {
//     return rejectWithValue(err.message || "Network error");
//   }
// });

// // --- Slice ---
// interface AuthState {
//   user: any | null;
//   token: string | null;
//   status: "idle" | "loading" | "failed";
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   status: "idle",
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // SIGNUP
//     builder
//       .addCase(signup.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state) => {
//         state.status = "idle";
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.status = "failed";
//         state.error =
//           (action.payload as string) ||
//           action.error.message ||
//           "Sign up failed";
//       });

//     // SIGNIN
//     builder
//       .addCase(signin.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(
//         signin.fulfilled,
//         (state, action: PayloadAction<AuthResponse>) => {
//           state.status = "idle";
//           state.user = action.payload.user;
//           state.token = action.payload.token;
//         }
//       )
//       .addCase(signin.rejected, (state, action) => {
//         state.status = "failed";
//         state.error =
//           action.payload || action.error.message || "Sign in failed";
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as api from "../../api/authApi";

// --- Types ---
export interface AuthResponse {
  user: api.UserRecord;
  token: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends SigninCredentials {
  fullName: string;
}

// --- Thunks ---
// 1) Sign up (POST)
export const signup = createAsyncThunk<void, SignupCredentials>(
  "auth/signup",
  async (creds, { rejectWithValue }) => {
    try {
      await api.register(creds);
    } catch (err: any) {
      return rejectWithValue(err.message || "Sign up failed");
    }
  }
);

// 2) Sign in (GET + match)
export const signin = createAsyncThunk<
  AuthResponse,
  SigninCredentials,
  { rejectValue: string }
>("auth/signin", async (creds, { rejectWithValue }) => {
  try {
    // fetch the entire user list
    const resp = await api.fetchUsers();
    const users = resp.data;

    const found = users.find(
      (u) => u.email === creds.email && u.password === creds.password
    );
    if (!found) {
      return rejectWithValue("Invalid email or password");
    }

    return {
      user: found,
      token: "", // Beeceptor doesn’t return a real token
    };
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

// --- Slice ---
interface AuthState {
  user: api.UserRecord | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    // SIGNUP
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Sign up failed";
      });

    // SIGNIN
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Sign in failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
