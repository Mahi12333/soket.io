// import { useEffect } from 'react';
// import {useNavigate} from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProteRoute = ({children}) => {
//   const{status}=useSelector(state=>state.athentication);
//   const navigate=useNavigate();

//   useEffect(()=>{
//     const isAuthenticated = status;
//     if(!isAuthenticated){
//       navigate('/signin')
//     }
//   })
  
//   return children;
// };

// export default ProteRoute;