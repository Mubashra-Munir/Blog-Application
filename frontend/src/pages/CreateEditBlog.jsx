
// /////////////////////
// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createPost, updatePost, getPosts, deletePost } from '../api/postAPI';
// import Banner from '../components/Banner';

// const CreateEditBlog = () => {
//   const [formData, setFormData] = useState({ title: '', content: '' });
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await getPosts();
//         setPosts(data);
//       } catch (err) {
//         setError('Failed to fetch posts');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     if (id) {
//       const fetchPost = async () => {
//         try {
//           setLoading(true);
//           const { data } = await getPosts();
//           const postToEdit = data.find((post) => post._id === id);
//           if (postToEdit) {
//             setFormData({ title: postToEdit.title, content: postToEdit.content });
//           }
//         } catch (err) {
//           setError('Failed to fetch post for editing');
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchPost();
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (id) {
//         await updatePost(id, formData, token);
//         alert('Blog updated successfully!');
//       } else {
//         await createPost(formData, token);
//         alert('Blog created successfully!');
//       }
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       if (window.confirm('Are you sure you want to delete this post?')) {
//         setLoading(true);
//         await deletePost(postId, token);
//         setPosts(posts.filter((post) => post._id !== postId));
//         alert('Post deleted successfully!');
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Delete failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (postId) => {
//     navigate(`/edit/${postId}`);
//   };

//   return (
//     <>
//       <Banner />
//       <div className="container mt-5">
//         <h2>{id ? 'Edit Blog' : 'Create Blog'}</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <form onSubmit={handleSubmit}>
//         //           {/* Image upload */}
//           <div className="mb-3">
//            <label>Image</label>
//              <input
//               type="file"
//               className="form-control"
//               accept="image/*"
//               onChange={handleImageChange}
//               disabled={loading}
//             />
//             {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" style={{ width: '200px' }} />}
//           </div>
//           <div className="mb-3">
//             <label>Title</label>
//             <input
//               type="text"
//               className="form-control"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//               disabled={loading}
//             />
//           </div>
//           <div className="mb-3">
//             <label>Content</label>
//             <textarea
//               className="form-control"
//               rows="5"
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               required
//               disabled={loading}
//             ></textarea>
//           </div>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? 'Processing...' : id ? 'Update' : 'Create'}
//           </button>
//         </form>

//         <hr />

//         <h3>Blog Posts</h3>
//         {loading && <p>Loading...</p>}
//         {!loading && posts.length === 0 && <p>No blog posts available.</p>}
//         <ul className="list-group">
//           {posts.map((post) => (
//             <li key={post._id} className="list-group-item d-flex justify-content-between align-items-center">
//               <span>{post.title}</span>
//               <div>
//                 {/* View Button */}
//                 <button
//                   className="btn btn-info btn-sm me-2"
//                   onClick={() => navigate(`/post/${post._id}`)}
//                   disabled={loading}
//                 >
//                   View
//                 </button>

//                 {/* Edit Button */}
//                 <button
//                   className="btn btn-warning btn-sm me-2"
//                   onClick={() => handleEdit(post._id)}
//                   disabled={loading}
//                 >
//                   Edit
//                 </button>

//                 {/* Delete Button */}
//                <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(post._id)}
//                   disabled={loading}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default CreateEditBlog;
/////////////////////////////////



////////////////////////////////////

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, getPosts, deletePost } from '../api/postAPI';
import Banner from '../components/Banner';
//import axios from 'axios'

const CreateEditBlog = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const { data } = await getPosts();
          const postToEdit = data.find((post) => post._id === id);
          if (postToEdit) {
            // setFormData({ title: postToEdit.title, content: postToEdit.content, image: postToEdit.image });
            setFormData({
              title: postToEdit.title,
              content: postToEdit.content,
              image: postToEdit.image,
            });
            setImagePreview(postToEdit.image); // Set preview if editing a post with an image
          }
        } catch (err) {
          setError('Failed to fetch post for editing');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('image', formData.image);
    try {
      setLoading(true);
      if (id) {
        await updatePost(id, form, token); // Assuming updatePost can handle FormData
        alert('Blog updated successfully!');
      } else {
        await createPost(form, token); // Assuming createPost can handle FormData
        alert('Blog created successfully!');
      }
      navigate('/');
    } catch (err) {
      console.error("Error occurred:", err);
      setError(err.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        setLoading(true);
        await deletePost(postId, token);
        setPosts(posts.filter((post) => post._id !== postId));
        alert('Post deleted successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <>
      <Banner />
      <div className="container mt-5">
        <h2>{id ? 'Edit Blog' : 'Create Blog'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label>Content</label>
            <textarea
              className="form-control"
              rows="5"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              disabled={loading}
            ></textarea>
          </div>

          {/* Image upload */}
          <div className="mb-3">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" style={{ width: '200px' }} />}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : id ? 'Update' : 'Create'}
          </button>
        </form>

        <hr />

        <h3>Blog Posts</h3>
        {loading && <p>Loading...</p>}
        {!loading && posts.length === 0 && <p>No blog posts available.</p>}
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{post.title}</span>
              <div>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => navigate(`/post/${post._id}`)}
                  disabled={loading}
                >
                  View
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(post._id)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(post._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreateEditBlog;

