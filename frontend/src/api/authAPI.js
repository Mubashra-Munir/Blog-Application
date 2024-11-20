import axios from 'axios'; 
// Import axios to make HTTP requests to the API.

const API_URL = 'http://localhost:5000/api/users'; 
// Define the base URL for the API endpoint dealing with user authentication and registration.

export const register = async (data) => 
  axios.post(`${API_URL}/register`, data); 
// Function to register a new user. Sends a POST request to the API's register endpoint with the user data.

export const login = async (data) => 
  axios.post(`${API_URL}/login`, data); 
// Function to authenticate a user. Sends a POST request to the API's login endpoint with the user's credentials.

