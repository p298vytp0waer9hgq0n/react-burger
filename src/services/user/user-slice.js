import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestPwReset from "../../utils/request-pw-reset";
import resetPassword from "../../utils/reset-pw";

export const requestReset = createAsyncThunk('user/requestReset', requestPwReset);
export const reset = createAsyncThunk('user/reset', resetPassword);

const initialState = {
  userName: '',
  email: '',
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
      console.log('Ошибка восстановления пароля: ', action.error.message);
    },
    [reset.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [reset.rejected]: (state, action) => {
      console.log('Ошибка восстановления пароля: ', action.error.message);
    },
  }
})

export default userSlice.reducer;

export const { setUserName, setEmail } = userSlice.actions;
