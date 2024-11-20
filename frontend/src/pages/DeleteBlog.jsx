import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPosts } from "../api/postAPI";

const DeleteBlog = () => {
  const { id } = useParams(); // Get the blog post ID from the URL.
  const navigate = useNavigate(); // Hook for navigation.
  const token = localStorage.getItem("token"); // Retrieve authentication token from localStorage.

  const [blog, setBlog] = useState(null); // State to store the blog details.
  const [error, setError] = useState(""); // State to handle errors.

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await getPosts(); // Fetch all posts.
        const postToDelete = data.find((post) => post._id === id); // Find the specific post by ID.
        if (postToDelete) {
          setBlog(postToDelete); // Set the blog details in the state.
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        setError("Failed to fetch blog details.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id, token); // Call the API to delete the blog.
      navigate("/"); // Redirect to the blog list page after successful deletion.
    } catch (err) {
      console.error(err.response?.data?.error || "Failed to delete the blog.");
      setError("Failed to delete the blog.");
    }
  };

  if (error) {
    return (
      <div className="container mt-5">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Delete Blog</h2>
      <p>Are you sure you want to delete this blog?</p>
      <h4>{blog.title}</h4>
      <p>{blog.content}</p>

      <button className="btn btn-danger me-3" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteBlog;
