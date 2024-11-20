// import { useState, useEffect } from 'react'; 
// // Import React hooks. useState is used for managing component state, and useEffect is for running side effects.

// import { useParams, useNavigate } from 'react-router-dom'; 
// // Import React Router hooks. useParams gets the URL parameters, and useNavigate helps with programmatic navigation.

// import { getPosts, deletePost } from '../api/postAPI'; 
// // Import API functions to fetch and delete blog posts from an external API.
// import Banner from '../components/Banner';

// const BlogDetails = () => {
//   // Component definition for displaying and managing a single blog post's details.

//   const { id } = useParams(); 
//   // Extract the 'id' parameter from the URL, which identifies the blog post.

//   const [post, setPost] = useState(null); 
//   // State variable 'post' is initialized as null to hold the details of the specific blog post.

//   const navigate = useNavigate(); 
//   // Instantiate the navigation hook to redirect users programmatically.

//   const token = localStorage.getItem('token'); 
//   // Retrieve the authentication token from localStorage for secure API requests.

//   useEffect(() => {
//     // useEffect is triggered when the component mounts or when the 'id' parameter changes.

//     const fetchPost = async () => {
//       // Define an asynchronous function to fetch blog posts from the API.

//       const { data } = await getPosts(); 
//       // Call the getPosts function to retrieve all posts. Destructure the response to access the 'data'.

//       const foundPost = data.find((p) => p._id === id); 
//       // Find the specific post by matching its '_id' with the 'id' from the URL parameters.

//       setPost(foundPost); 
//       // Update the 'post' state with the fetched blog post details.
//     };

//     fetchPost(); 
//     // Invoke the fetchPost function to fetch the data.

//   }, [id]); 
//   // Dependency array ensures this effect runs whenever the 'id' changes.

//   const handleDelete = async () => {
//     // Define an asynchronous function to handle deleting the blog post.

//     try {
//       await deletePost(id, token); 
//       // Call the deletePost API function, passing the blog post 'id' and the authentication 'token'.

//       navigate('/'); 
//       // Redirect the user to the home page after successful deletion.
//     } catch (err) {
//       console.error(err.response?.data?.error || 'Delete failed'); 
//       // Log any errors, including specific API error messages if available.
//     }
//   };

//   return (
    
//     <div className="container mt-5">
//       {/* Render the component content with Bootstrap styling for a container with top margin. */}

//       {post ? (
//         // Check if 'post' data is available. If yes, render the blog details.
//         <>
//           <h2>{post.title}</h2> 
//           {/* Display the blog post title. */}

//           <p className="text-muted">By {post.user.name}</p> 
//           {/* Display the author's name with a muted text style. */}

//           <p>{post.content}</p> 
//           {/* Display the blog post content. */}

//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             Delete
//           </button>
//           {/* Render a Delete button. On click, call the handleDelete function. */}

//           <button
//             className="btn btn-secondary"
//             onClick={() => navigate(`/edit/${post._id}`)}
//           >
//             Edit
//           </button>
//           {/* Render an Edit button. On click, navigate to the edit page for this blog post. */}
//         </>
//       ) : (
//         // If 'post' data is not available, show a loading message.
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default BlogDetails; 
// // Export the BlogDetails component to be used in other parts of the application.

////////////////////////////////////

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts } from '../api/postAPI';
import Banner from '../components/Banner';

const DetailView = () => {
  const { id } = useParams(); // Get the 'id' from the route parameters.
  const navigate = useNavigate(); // For navigating back or elsewhere.
  const [post, setPost] = useState(null); // Store the blog post data.
  const [loading, setLoading] = useState(false); // Loading state.
  const [error, setError] = useState(''); // Error message state.

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await getPosts(); // Fetch all posts (adjust this to a single post API call if available).
        const foundPost = data.find((item) => item._id === id); // Find the specific post by ID.
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to fetch post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <Banner />
      <div className="container mt-5">
        {post ? (
          <>
            <h1 className="mb-3">{post.title}</h1>
            <p className="text-muted">By {post.user?.name}</p>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="img-fluid mb-3"
              />
            )}
            <p>{post.content}</p>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)} // Navigate back to the previous page.
            >
              Back
            </button>
          </>
        ) : (
          <p>Post not found.</p>
        )}
      </div>
    </>
  );
};

export default DetailView;



