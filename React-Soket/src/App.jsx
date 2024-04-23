import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/AuthSlice";

function App() {
  const isAuthenticated = useSelector(state => state.athentication.isAuthenticated);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('chat-user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  
  return (
    <Router>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={isAuthenticated ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
