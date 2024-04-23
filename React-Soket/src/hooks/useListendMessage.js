import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/conversationSlice";
import notificationSound from "../assets/sounds/frontend_src_assets_sounds_notification.mp3";
import { useSocketContext } from "../socket/Socket";

const useListenMessages = () => {
	const dispatch=useDispatch();
	const {socket}=useSocketContext();
    const messages = useSelector(state => state.conversation.messages);
	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			dispatch(setMessages([...messages, newMessage]));
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;