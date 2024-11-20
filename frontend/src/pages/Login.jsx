import { useState } from 'react'; 
import { login } from '../api/authAPI'; 
// Import the login API function to authenticate users.
import { useNavigate } from 'react-router-dom'; 


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' }); 
  // State to store email and password inputs.

  const navigate = useNavigate(); 
  // Hook to navigate to different routes after successful login.

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Prevent default form submission to handle it with JavaScript.

    try {
      const { data } = await login(formData); 
      // Call the login API with the form data and get the response.

      localStorage.setItem('token', data.token); 
      // Store the token in localStorage for authentication persistence.

      navigate('/'); 
      // Redirect to the home page on successful login.
      
      alert("Login successful!");// Show success alert
   
    } catch (err) {
      console.error(err.response?.data?.error || 'Login failed'); 
      // Log errors, including any from the server.
      
      alert("Invalid Email or Password!");// Show Error alert
    }
  };

  return (
    <div className="container mt-5">
      {/* Main container for the form with Bootstrap styling and top margin. */}

      <h2>Login</h2>
      {/* Display the heading for the login page. */}

      <form onSubmit={handleSubmit}>
        {/* Handle form submission with the handleSubmit function. */}

        <div className="mb-3">
          <label>Email</label>
          {/* Label for the email input field. */}

          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {/* Input field for the user's email, updating the 'email' property in state. */}
        </div>

        <div className="mb-3">
          <label>Password</label>
          {/* Label for the password input field. */}

          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {/* Input field for the user's password, updating the 'password' property in state. */}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        {/* Button to submit the form, triggering the login process. */}
      </form>
    </div>
  );
};

export default Login; 
// Export the Login component for use in the application.

