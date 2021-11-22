import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import notificationReducer from '../features/notification';
import roomReducer from '../features/room';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    room: roomReducer,
  },
});

export default store;
