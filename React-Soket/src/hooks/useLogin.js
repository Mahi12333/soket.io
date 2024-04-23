import { useState } from "react";
import toast from "react-hot-toast";
import { setUser } from "../store/AuthSlice";
import { useDispatch } from 'react-redux';
import axios from "axios";


const useLogin = () => {
	const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			// const res = await fetch("http://localhost:8002/api/auth/login", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
				
			// 	body: JSON.stringify({ username, password }),
			// });

			const res = await axios.post("http://localhost:8002/api/auth/login", {
				username,
				password,
			  },
			  {
				withCredentials: true,
			  }
			);
			//console.log(res);
			const data = res.data;
			//console.log("uselogin",data)
			if (data.error) {
				throw new Error(data.error);
			}
			dispatch(setUser(data))
		} catch (error) {
			//console.log("uselogin",error)
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;


function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}
	return true;
}
