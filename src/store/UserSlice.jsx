
import { createSlice } from '@reduxjs/toolkit';

let details = JSON.parse(localStorage.getItem("TaskappAuth"));
const initialState = {
  login: details ? details.login : false,
  user: details ? details.user : '',
  token: details ? details.token : ''
};

const userSlice = createSlice({
  name: 'user',  // keep lowercase here to avoid confusion
  initialState,
  reducers: {
    setstate: (state, action) => {
      // console.log(action.payload);
      localStorage.setItem('TaskappAuth', JSON.stringify({ login: true, token: action.payload.token, user: "" }));
      state.login = true;
      state.token = action.payload.token;
    },
    updateuser: (state, action) => {
      // console.log(action.payload);
      localStorage.setItem('TaskappAuth', JSON.stringify({ login: true, token: state.token, user: action.payload.user }));
      state.user = action.payload.user;
    },
    logout: (state,action) => {
      localStorage.removeItem("TaskappAuth");
      state.login = false;
      state.user = "";
      state.token = "";
    }
  }
});

export const { setstate, updateuser, logout } = userSlice.actions;

export default userSlice.reducer;
