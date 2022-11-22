import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import requestPwReset from "../../utils/api/request-pw-reset";
import resetPassword from "../../utils/api/reset-pw";
import login from "../../utils/api/login";
import register from "../../utils/api/register";
import parseTokenExp from "../../utils/parse-token-exp";
import getNewToken from "../../utils/api/get-new-token";
import { TUserResponse } from "../../utils/types";

export const requestReset = createAsyncThunk('user/requestReset', requestPwReset);
export const reset = createAsyncThunk('user/reset', resetPassword);
export const loginUser = createAsyncThunk('user/login', login);
export const registerUser = createAsyncThunk('user/register', register);
export const refreshToken = createAsyncThunk('user/refresh', getNewToken);

type TUserState = {
  userName: string;
  email: string;
  accToken: string;
  expire: number;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: TUserState = {
  userName: '',
  email: '',
  accToken: '',
  expire: 0,
  isLoading: true,
  hasError: false
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAccToken: (state, action) => {
      state.accToken = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    setLogoff: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(requestReset.fulfilled, () => {
    })
    builder.addCase(requestReset.rejected, (state, action) => {
      console.error('Ошибка восстановления пароля: ', action.error.message);
    })
    builder.addCase(reset.fulfilled, () => {
    })
    builder.addCase(reset.rejected, (state, action) => {
      console.error('Ошибка восстановления пароля: ', action.error.message);
    })
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email;
      state.accToken = action.payload.accessToken;
      state.expire = parseTokenExp(action.payload.accessToken);
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error('Ошибка входа: ', action.error.message);
    })
    builder.addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accToken = action.payload.accessToken;
      state.expire = parseTokenExp(action.payload.accessToken);
    })
    builder.addCase(refreshToken.rejected, (state, action) => {
      console.error('refresh error', action.error.message);
    })
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email;
      state.accToken = action.payload.accessToken;
      state.expire = parseTokenExp(action.payload.accessToken);
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      console.error('Ошибка регистрации: ', action.error.message);
    })
  }
})

export default userSlice.reducer;

export const { setUserName, setEmail, setAccToken, setIsLoading, setLogoff, setHasError } = userSlice.actions;
