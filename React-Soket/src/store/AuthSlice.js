import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      localStorage.setItem("chat-user", JSON.stringify( action.payload));
    },
  
    userlogout(state,action){
      state.user = '';
      state.status=false;
      state.isLogin = false;
      state.loading = false;
      state.error = null;  
      localStorage.removeItem("chat-user");
   }
  },
});

export const { setUser,userlogout } = authSlice.actions;
export default authSlice.reducer;
