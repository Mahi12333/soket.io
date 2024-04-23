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
            const socket = io("http://localhost:8002", {
            query: {
                userId: user._id,
            },
          withCredentials:true,
          transports: ['websocket','polling']
        });
             
            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });
    
            socket.on("getOnlineUsers", (users) => {
                dispatch(setOnlineUsers(users));
            });
    
            dispatch(setSocket(socket));
    
            return () => {
                if (socket) {
                  socket.close();
                    dispatch(setSocket(null));
                }
            };
        }
    }, [dispatch, user]);

    return children;
};

export default SocketContextProvider;
