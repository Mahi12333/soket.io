import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

    //console.log("mmm",token);
	res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Set to true in production
    });
   // return token;
};
export default generateTokenAndSetCookie;

