import { useSelector } from "react-redux";
import Conversations from "./Conversations";
import LogoutButton from "./LocoutButtom";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col bg-gray-500'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton/>
		</div>
	);
};
export default Sidebar;