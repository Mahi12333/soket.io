import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";

const LogoutButton = () => {
	const { loading, logout} = useLogout();
   const user=useSelector(state=>state.athentication.user);
	console.log(user);

	return (
		<div className='mt-auto'>
    <div className="flex justify-between m-auto">
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
        {loading ? (
            <span className='loading loading-spinner'></span>
        ) : (
            user && (
                <div className="w-20 h-6 border-2 text-blue-800 bg-purple-100 text-xs border-lime-500 font-semibold rounded-xl justify-center items-center">
                    {user.fullName}
                </div>
            )
        )}
    </div>
</div>
	);
};
export default LogoutButton;