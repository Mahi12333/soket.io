
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';
import http from "http";
import { Server } from "socket.io";
import connectDB from "./database/connection.js";
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
const app = express();



app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
      origin: "http://localhost:5173",
      methods:["GET","POST"],
      credentials: true,
    })
  );

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


export const getReceiverSocketId = (receiverId) => {  
    return userSocketMap[receiverId];
};

// const userSocketMap = {}; // {userId: socketId}
// io.on("connection", (socket)=>{
//     console.log("a user connected", socket);
// });

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });

  io.on("error", (err) => {
    console.error("Socket error:", err);
});

const userSocketMap = {}; // {userId: socketId}
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    console.log("userid", userId)
    //if (userId != "undefined") userSocketMap[userId] = socket.id;

    if (userId) {
        userSocketMap[userId] = socket.id;  // !Online user ko map mei add karta hai
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //! Online users ki list ko sabhi clients ko bhejta hai

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId]; //! Disconnect hone par user ko map se remove karta hai
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); //! Updated online users ki list ko sabhi clients ko bhejta hai
    });
});

connectDB();
server.listen(process.env.PORT || 5000 , () => {
    console.log(`⚙️ Server is running at port : http://localhost:${process.env.PORT}`);
});

export { io };
