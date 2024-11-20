import { useState } from 'react'; 
import { register } from '../api/authAPI'; 
import { useNavigate } from 'react-router-dom'; 
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); 
  // State to store the user's registration form inputs.

  const navigate = useNavigate(); 
  // Hook for programmatic navigation.

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Prevent default form submission to handle it with JavaScript.

    try {
      await register(formData); 
      // Call the register API with the form data to create a new user.

      navigate('/login'); 
      // Redirect to the login page after successful registration.
      alert("Registration successful!"); 
    } catch (err) {
      console.error(err.response?.data?.error || 'Registration failed'); 
      // Log any errors, including server-side validation issues.
       alert("User Already Registered!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Handle form submission with the handleSubmit function. */}

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {/* Input field for the user's name, updating the 'name' property in state. */}
        </div>

        <div className="mb-3">
          <label>Email</label>
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
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {/* Input field for the user's password, updating the 'password' property in state. */}
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register; 


