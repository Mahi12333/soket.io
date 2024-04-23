import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { loginUser } from '../../store/AuthSlice';

function SignIn() {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch=useDispatch();
  const {status}=useSelector(state=>state.athentication);
  const navigate=useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    if (status) {
      // Redirect to the home page
      //navigate.push('/');
      navigate('/')
    }
  }, [status, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form data
      await validationSchema.validate({email, password }, { abortEarly: false });
     dispatch(loginUser({email,password}))
      // If validation passes, continue with signin logic (e.g., API call)
      
      // Clear form fields
      setEmail('');
      setPassword('');
      setErrors({});
   
    } catch (error) {
      // If validation fails, set errors object with validation errors
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };
   
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Sign in</h2>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //required
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && 'border-red-500'}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //required
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            >
              Sign In
            </button>
            <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
