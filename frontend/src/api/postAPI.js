
  //////////////////////////////
  import axios from 'axios'; 
// Import axios to make HTTP requests to the API.

const API_URL = 'http://localhost:5000/api/posts'; 
// Define the base URL for the API (assuming a local server for development).

// Function to create a new post. It sends a POST request to the API.
export const createPost = async (data, token) =>
  axios.post(API_URL, data, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
// Sends the post data with an Authorization header containing the JWT token.

export const getPosts = async () => axios.get(API_URL); 
// Function to get all posts. It sends a GET request to the API and returns the response.

export const updatePost = async (id, data, token) => 
  axios.put(`${API_URL}/${id}`, data, { 
    headers: { Authorization: `Bearer ${token}` } 
  });

// Fixed deletePost function with full API URL
export const deletePost = async (id, token) => {
  return await axios.delete(`${API_URL}/${id}`, {  // Use the full URL here
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// ///////////////////
// import axios from 'axios'; 

// const API_URL = 'http://localhost:5000/api/posts'; 
// // Define the base URL for the API (assuming a local server for development).

// // Function to create a new post with multipart/form-data for image upload
// export const createPost = async (data, token) => {
//   try {
//     const response = await axios.post(API_URL, data, { 
//       headers: { 
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data' // Ensure the request uses multipart/form-data
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error; // Handle errors here, like invalid token, network issues, etc.
//   }
// };

// // Function to get all posts
// export const getPosts = async () => axios.get(API_URL);

// // Function to update an existing post with multipart/form-data for image upload
// export const updatePost = async (id, data, token) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, data, { 
//       headers: { 
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data' // Ensure the request uses multipart/form-data
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error; // Handle errors here, like invalid token, network issues, etc.
//   }
// };

// // Function to delete a post
// export const deletePost = async (id, token) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${id}`, { 
//       headers: { 
//         'Authorization': `Bearer ${token}` 
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error; // Handle errors here
//   }
// };


/////////////////////

// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/posts'; 

// // Function to create a new post with multipart/form-data for image upload
// export const createPost = async (title, content, image, token) => {
//   // Create a FormData object to append the fields
//   const formData = new FormData();
  
//   // Append text fields (title and content)
//   formData.append('title', title);
//   formData.append('content', content);
  
//   // Append image field if there's a file
//   if (image) {
//     formData.append('image', image);
//   }

//   try {
//     const response = await axios.post(API_URL, formData, { 
//       headers: { 
//         'Authorization': `Bearer ${token}`, // Pass the token for authentication
//         'Content-Type': 'multipart/form-data' // Ensure it's sent as multipart
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating post:', error);
//     throw error; // Handle errors here
//   }
// };

// // Function to get all posts
// export const getPosts = async () => axios.get(API_URL);

// // Function to update an existing post with multipart/form-data for image upload
// export const updatePost = async (id, data, token) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, data, { 
//       headers: { 
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data' // Ensure it’s sent as multipart
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Function to delete a post
// export const deletePost = async (id, token) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${id}`, { 
//       headers: { 
//         'Authorization': `Bearer ${token}` 
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


