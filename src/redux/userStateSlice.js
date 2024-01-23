import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_user: null,
};

const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      state.current_user = action.payload.user;
    },
  },
});

export const { updateUserState } = userStateSlice.actions;
export default userStateSlice.reducer;

/* 
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  current_user: null,
};

const userState_slice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    updateUserState: (state, dispatch) => {
      return state.current_user = dispatch.payload.user;
    },
  },
});

export const { updateUserState } = userState_slice.actions;
export default userState_slice;





*/
