import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null,
    onlineUsers: [],
  };
  
  const socketSlice=createSlice({
    name: 'socket',
    initialState,
    reducers:{
      setSocket(state,action){
        state.socket=action.payload;
      },
      setOnlineUsers(state,action){
         state.onlineUsers=action.payload;
      }
    }
  })

export const {setOnlineUsers, setSocket}=socketSlice.actions;
export default socketSlice.reducer;




  // const socketReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'SET_SOCKET':
  //       return {
  //         ...state,
  //         socket: action.payload,
  //       };
  //     case 'SET_ONLINE_USERS':
  //       return {
  //         ...state,
  //         onlineUsers: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
  // };

  // export default socketReducer;
  

  // export const setSocket = (socket) => ({
  //   type: 'SET_SOCKET',
  //   payload: socket,
  // });
  
  // export const setOnlineUsers = (users) => ({
  //   type: 'SET_ONLINE_USERS',
  //   payload: users,
  // });




  
  