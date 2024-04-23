import { extractTime } from "../../utils/extractTime";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
	const selectedConversation = useSelector(state => state.conversation.selectedConversation);
	const user =useSelector(state=>state.athentication.user);
	const fromMe = message.senderId === user._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-fuchsia-900" : "";
    
	const shakeClass = message.shouldShake ? "shake" : "";
    //console.log(fromMe,formattedTime,chatClassName,profilePic,bubbleBgColor,shakeClass)
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;