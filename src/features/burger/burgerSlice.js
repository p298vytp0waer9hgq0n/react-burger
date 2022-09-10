import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: {},
  components: []
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    burgerAdd: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else{
        state.components.push(action.payload);
      }
    }
  }
})

export default burgerSlice.reducer;

export const { burgerAdd } = burgerSlice.actions;
