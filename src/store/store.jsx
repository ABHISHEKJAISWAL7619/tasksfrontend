// import { configureStore } from '@reduxjs/toolkit'
// import { UserSlice } from './userslice'

// export const store = configureStore({
//   reducer: {
//     user: UserSlice,
//   },
// })
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice'; // ✅ notice this import

export const store = configureStore({
  reducer: {
    user: userReducer, // ✅ must be the reducer function, not the whole slice
  },
});

