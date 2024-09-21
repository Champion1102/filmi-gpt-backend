import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
      };
    },
    removeUser: (state) => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
