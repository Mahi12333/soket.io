import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);


	useEffect(() => {
		const getConversations = async () => {
			  setLoading(true);
			 try {
				const res = await fetch('http://localhost:8002/api/users', {
				method: 'GET',
				credentials: 'include'
				});

				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
                
				// const res = await axios.get("http://localhost:8002/api/users");
			    // console.log(res.data)
			    // const data = res.data;

				const data= await res.json();
				//console.log("useGetConver",data);
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;