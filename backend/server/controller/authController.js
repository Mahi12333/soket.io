import bcrypt from "bcryptjs";
import UserModel from "../model/User.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
// import generateAndSetCookie from "../utils/generatecookies.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
	//console.log(req.body);
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}
		const user = await UserModel.findOne({ username });
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
		const newUser = new UserModel({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const login = async (req, res) => {
	console.log("login")
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username });
	
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
         
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);
		const userId=user._id
		const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
			expiresIn: "15d",
		});
	
		//console.log("mmm",token);
		// res.cookie("jwt", token, {
		// 	httpOnly: true,
		// secure: process.env.NODE_ENV === "production",
		// 	sameSite: 'strict',
		// });

		res
		.cookie("jwt", token, { httpOnly: true, secure: false,  sameSite: "none" })
		
	 return	res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,			
		});


	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


// export const generateAndSetCookie = (req,res) => {
// 	const token = req.cookies.jwt;  
//     return token;
// };
