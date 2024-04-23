import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setUser } from "../store/AuthSlice";


const useSignup = () => {
	const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;
		setLoading(true);
		try {
			// const res = await fetch("http://localhost:8002/api/auth/signup", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			// });
			// const data = await res.json();

            const res = await axios.post("http://localhost:8002/api/auth/signup", {
				fullName, username, password, confirmPassword, gender
			  },
			  {
				withCredentials: true,
			  }
			);

			// console.log(res);
			const data = res.data;
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			dispatch(setUser(data));
		} catch (error) {
			console.log("uselogin",error)
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}
	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}
	return true;
}