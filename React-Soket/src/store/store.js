import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./AuthSlice";
import conversationSlice from "./conversationSlice";
import socktSlice from './socketSlice'
const store=configureStore({
    reducer:{
        athentication: Authslice,
        conversation: conversationSlice,
        socket:socktSlice,
    }
})
export default store;
