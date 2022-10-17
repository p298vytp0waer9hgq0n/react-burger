import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestPwReset from "../../utils/request-pw-reset";
import resetPassword from "../../utils/reset-pw";
import login from "../../utils/login";
import register from "../../utils/register";
import getUserDetails from "../../utils/get-user-details";
import parseTokenExp from "../../utils/parse-token-exp";

export const requestReset = createAsyncThunk('user/requestReset', requestPwReset);
export const reset = createAsyncThunk('user/reset', resetPassword);
export const loginUser = createAsyncThunk('user/login', login);
export const registerUser = createAsyncThunk('user/register', register);
export const getUser = createAsyncThunk('user/get', getUserDetails);

const initialState = {
  userName: '',
  email: '',
  roles: '',
  accToken: '',
  expire: 0
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
      document.cookie = `refToken=${action.payload.refreshToken}`;
    },
    [loginUser.rejected]: (state, action) => {
      console.error('Ошибка входа: ', action.error.message);
    },
    [getUser.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [getUser.rejected]: (state, action) => {
      console.error('Ошибка загрузки информации о пользователе: ', action.error.message);
    },
    [registerUser.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [registerUser.rejected]: (state, action) => {
      console.error('Ошибка регистрации: ', action.error.message);
    }
  }
})

export default userSlice.reducer;

export const { setUserName, setEmail } = userSlice.actions;
