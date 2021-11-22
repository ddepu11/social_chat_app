import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { currentRoomId: null },
};

const roomSlice = createSlice({
  name: 'room',
  initialState,

  reducers: {
    setRoomId: (state = initialState, action) => {
      state.value = { currentRoomId: action.payload };
    },
  },
});

export const { setRoomId } = roomSlice.actions;

export default roomSlice.reducer;
