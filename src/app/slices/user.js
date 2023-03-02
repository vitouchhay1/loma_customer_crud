import { createSlice} from "@reduxjs/toolkit";
const initialState = {
  user: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectedUsers: (state, action) => {
        console.log('in');
      state.user = action.payload;
    }
  },
});
export const user = (state) => state.user.user;
export const { selectedUsers } = userSlice.actions
export default userSlice.reducer;