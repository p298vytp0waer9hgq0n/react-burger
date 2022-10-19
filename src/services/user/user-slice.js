import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestPwReset from "../../utils/api/request-pw-reset";
import resetPassword from "../../utils/api/reset-pw";
import login from "../../utils/api/login";
import register from "../../utils/api/register";
import parseTokenExp from "../../utils/parse-token-exp";
import getNewToken from "../../utils/api/get-new-token";

export const requestReset = createAsyncThunk('user/requestReset', requestPwReset);
export const reset = createAsyncThunk('user/reset', resetPassword);
export const loginUser = createAsyncThunk('user/login', login);
export const registerUser = createAsyncThunk('user/register', register);
export const refreshToken = createAsyncThunk('user/refresh', getNewToken);

const initialState = {
  userName: '',
  email: '',
  accToken: '',
  expire: 0,
  isLoading: true
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
    }
  },
  extraReducers: {
    [requestReset.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.resetEmail = '';
    },
    [requestReset.rejected]: (state, action) => {
      console.error('Ошибка восстановления пароля: ', action.error.message);
    },
    [reset.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [reset.rejected]: (state, action) => {
      console.error('Ошибка восстановления пароля: ', action.error.message);
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email;
      state.accToken = action.payload.accessToken;
      state.expire = parseTokenExp(action.payload.accessToken);
    },
    [loginUser.rejected]: (state, action) => {
      console.error('Ошибка входа: ', action.error.message);
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.accToken = action.payload.accessToken;
      state.expire = parseTokenExp(action.payload.accessToken);
    },
    [refreshToken.rejected]: (state, action) => {
      console.error('refresh error', action.error.message);
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email;
      state.accToken = action.payload.accessToken;
      state.expire = parseTokenExp(action.payload.accessToken);
    },
    [registerUser.rejected]: (state, action) => {
      console.error('Ошибка регистрации: ', action.error.message);
    }
  }
})

export default userSlice.reducer;

export const { setUserName, setEmail, setAccToken, setIsLoading } = userSlice.actions;
