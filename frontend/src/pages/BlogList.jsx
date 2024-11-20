// import { useEffect, useState } from 'react';// Import React hooks. useEffect is used to handle side effects (like data fetching), and useState is for managing component state. 
// import { getPosts } from '../api/postAPI'; // Import the getPosts API function to fetch blog posts from an external source.
// import Banner from '../components/Banner';
// import '../App.css'

// const BlogList = () => {    // Define the BlogList functional component to display a list of blog posts.
//   const [posts, setPosts] = useState([]); // Initialize the 'posts' state as an empty array to hold the list of blog posts.
//   useEffect(() => {         // useEffect runs the fetchPosts function when the component mounts.

//     const fetchPosts = async () => {
//       // Define an asynchronous function to fetch posts.

//       const { data } = await getPosts();
//       // Call the getPosts API function and destructure the response to access the 'data'.

//       setPosts(data);
//       // Update the 'posts' state with the fetched data.
//     };

//     fetchPosts();
//     // Invoke the fetchPosts function to get the blog data.

//   }, []);
//   // Dependency array is empty to ensure the effect runs only once when the component mounts.

//   return (

//     <>
//       <Banner></Banner>
//       :
//       <div className="container mt-5">
//         <h2>Blog Posts</h2>
//         <div className="row">
//           {posts.map((post) => (
//             <div className="col-md-4" key={post._id}>
//               <div className="card mb-3">
//                 <div className="card-body">
//                   <h5 className="card-title">{post.title}</h5>
//                   <p className="card-text">
//                     {post.content.substring(0, 100)}...
//                   </p>
//                   <p className="text-muted">By {post.user.name}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogList;

////////////////////////////////

import { useEffect, useState } from 'react';
import { getPosts } from '../api/postAPI';
import Banner from '../components/Banner';
import '../App.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await getPosts();
      setPosts(data);
    };
   
    

    fetchPosts();
  }, []);

  // Sort posts in ascending order based on the `createdAt` field
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <Banner />
      <div className="container mt-5">
        <h2>Blog Posts</h2>
        <div className="row">
          {sortedPosts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content.substring(0, 100)}...</p>
                  <p className="text-muted">By {post.user.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;
