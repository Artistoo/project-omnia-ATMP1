import { createSlice } from "@reduxjs/toolkit";
const initializeStateInterest = {
  userInterest: [],
};
const userInterestState = createSlice({
  name: "int",
  initialState: initializeStateInterest,
  reducers: {
    addInterest: (state, action) => {
      state.userInterest = action.payload.interest;
    },
  },
});

export const { addInterest } = userInterestState.actions;
export default userInterestState.reducer;
