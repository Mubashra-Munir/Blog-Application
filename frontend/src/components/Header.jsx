import { Link, useNavigate } from 'react-router-dom'; 
const Header = () => {
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token'); 
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    // Remove the token from localStorage to log the user out.

    navigate('/login'); 
    // Redirect the user to the login page after logout.
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
     <Link className="navbar-brand" to="/">
          Blog App
        </Link>
        <div>
          {/* Conditional rendering based on user authentication. */}

          {token ? (
            <>
              {/* If the user is logged in, show the "Create Blog" and "Logout" buttons. */}

              <Link className="btn btn-primary me-2" to="/create">
                Create Blog
              </Link>
              {/* Link to the blog creation page. */}

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
              {/* Button to log out the user. Calls the handleLogout function. */}
        
              </>
          ) : (
            <>
              {/* If the user is not logged in, show the "Login" and "Register" buttons. */}

              <Link className="btn btn-primary me-2" to="/login">
                Login
              </Link>
              {/* Link to the login page. */}

              <Link className="btn btn-secondary" to="/register">
                Register
              </Link>
              {/* Link to the registration page. */}
            </>
          )}
        </div>
      </div>
    </nav>
     

  );
};

export default Header; 




