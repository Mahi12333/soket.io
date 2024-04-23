import { useState } from "react";
import {setMessages } from "../store/conversationSlice";
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";

const useSendMessage = () => {
	const dispatch=useDispatch();
	const [loading, setLoading] = useState(false);
    const selectedConversation = useSelector(state => state.conversation.selectedConversation);
	const messages = useSelector(state => state.conversation.messages);

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`http://localhost:8002/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				credentials:"include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			dispatch(setMessages([...messages, data])); //dispatch(setMessages([...messages, data]));
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { sendMessage, loading };
};
export default useSendMessage;