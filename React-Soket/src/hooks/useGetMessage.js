import { useEffect, useState } from "react";
import { setMessages } from "../store/conversationSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const useGetMessages = () => {
	const dispatch=useDispatch();
	const [loading, setLoading] = useState(false);
	const selectedConversation = useSelector(state => state.conversation.selectedConversation);
	const messages = useSelector(state => state.conversation.messages);

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:8002/api/messages/${selectedConversation._id}`,{
					credentials:"include"
				});
				const data = await res.json();
				//console.log("useGetM",data)
				if (data.error) throw new Error(data.error);
				dispatch(setMessages(data));
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, dispatch,setMessages]); //setMessages

	return { messages, loading };
};
export default useGetMessages;