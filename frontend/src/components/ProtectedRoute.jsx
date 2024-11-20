import { Navigate } from 'react-router-dom'; 


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  // Retrieve the authentication token from localStorage to check if the user is logged in.

  return token ? children : <Navigate to="/login" />; 
  // If a token exists (i.e., the user is logged in), render the child components.
  // Otherwise, redirect the user to the login page using <Navigate>.
};

export default ProtectedRoute; 

