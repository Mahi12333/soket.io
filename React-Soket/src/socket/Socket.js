import { useEffect } from "react";
import io from "socket.io-client";
import {useSelector,useDispatch } from "react-redux";
import { setOnlineUsers,setSocket } from "../store/socketSlice";

export const useSocketContext = () => {
  const socket = useSelector(state => state.socket.socket);
  const onlineUsers = useSelector(state => state.socket.onlineUsers);
  return { socket, onlineUsers };
};    


export const SocketContextProvider = ({ children }) => {
  const dispatch=useDispatch();
  const user =useSelector(state=>state.athentication.user);


 useEffect(() => {
        if (user) {
            const socket = io("http://localhost:8002", { //! Socket.IO connection banaata hai server ke saath
            query: {
                userId: user._id,  // send the ID to the Server 
            },
          withCredentials:true,  //! Cross-origin requests ke liye credentials include karta hai
          transports: ['websocket','polling'] //! WebSocket aur polling transports ka use karta hai
        });
             
            socket.on("connect_error", (error) => { //! error ko handle karne keliye use hota hai 
                console.error("Socket connection error:", error);
            });
    
            socket.on("getOnlineUsers", (users) => { //! Server se online users ki list ko receive karta hai
                dispatch(setOnlineUsers(users));  //! Online users ki list ko Redux store mei set karta hai
            });
    
            dispatch(setSocket(socket));  //! Socket ko Redux store mei set karta hai
    
            return () => {
                if (socket) { //! Component unmount hone par socket ko close karta hai
                  socket.close(); //! Socket connection ko close karta hai
                    dispatch(setSocket(null)); //! Redux store mei socket ko null karta hai
                }
            };
        }
    }, [dispatch, user]); //! useEffect ko user aur dispatch ke updates pe depend karta hai

    return children;
};

export default SocketContextProvider;
