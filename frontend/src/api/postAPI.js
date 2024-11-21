
//   //////////////////////////////
//   import axios from 'axios'; 
// // Import axios to make HTTP requests to the API.

// const API_URL = 'http://localhost:5000/api/posts'; 
// // Define the base URL for the API (assuming a local server for development).

// // Function to create a new post. It sends a POST request to the API.
// // export const createPost = async (data, token) =>
// //   axios.post(API_URL, data, { 
// //     headers: { Authorization: `Bearer ${token}` } 
// //   });


//   // Function to create a new post. It sends a POST request to the API with support for image uploads.
// export const createPost = async (data, token) => {
//   try {
//     return await axios.post(API_URL, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data', // Explicitly set for file uploads
//       },
//     });
//   } catch (error) {
//     throw error.response ? error.response.data : error; // Handle errors
//   }
// };

// // Function to update an existing post
// export const updatePost = async (id, data, token) => {
//   try {
//     return await axios.put(`${API_URL}/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };
// // Sends the post data with an Authorization header containing the JWT token.

// // export const getPosts = async () => axios.get(API_URL); 
// // Function to get all posts. It sends a GET request to the API and returns the response.

// // export const updatePost = async (id, data, token) => 
// //   axios.put(`${API_URL}/${id}`, data, { 
// //     headers: { Authorization: `Bearer ${token}` } 
// //   });


// export const getPosts = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/get-post');
//     console.log("Posts fetched successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching posts:", error.response?.data || error.message);
//     throw error;
//   }
// };


// // export const getPosts = async () => {
// //   try {
// //       const response = await axios.get(API_URL);
// //       return response.data;
// //   } catch (error) {
// //       console.error("Error fetching posts:", error);
// //       throw error;
// //   }
// // };
// // Fixed deletePost function with full API URL
// export const deletePost = async (id, token) => {
//   return await axios.delete(`${API_URL}/${id}`, {  // Use the full URL here
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };


/////////////////////////

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts'; // Base URL for posts

// Function to create a new post
export const createPost = async (data, token) => {
  if (!token) throw new Error("Authorization token is required");

  try {
    return await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

// Function to update an existing post
export const updatePost = async (id, data, token) => {
  if (!token) throw new Error("Authorization token is required");

  try {
    return await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update post");
  }
};

// Function to fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Posts fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

// Function to delete a post
export const deletePost = async (id, token) => {
  if (!token) throw new Error("Authorization token is required");

  try {
    return await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete post");
  }
};


