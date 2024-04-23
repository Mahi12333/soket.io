// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import User from '../model/User.js';


// const register= async (req,res)=>{
//     try {  
//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).json({ email: 'Email already exists' });
//         }

//         // Create new user
//         const newUser = new User({
//             fullName: req.body.fullName,
//             email: req.body.email,
//             password: bcrypt.hashSync(req.body.password, 10) // Hash password before saving
//         });
//         await newUser.save();

//         res.status(201).json({ success: true, message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// const login=async(req,res)=>{
//     try {
//         // Check if user exists
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(404).json({ email: 'User not found' });
//         }
//         // Validate password
//         if (!bcrypt.compareSync(req.body.password, user.password)) {
//             return res.status(401).json({ password: 'Incorrect password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ success: true, token: 'Bearer ' + token });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// export {register,login}