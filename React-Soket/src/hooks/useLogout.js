import { useState } from "react";
import toast from "react-hot-toast";
import { userlogout} from "../store/AuthSlice";
import { useDispatch } from 'react-redux';
// import { setUser } from "../store/AuthSlice";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
	
	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:8002/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			dispatch(userlogout());
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;

