import axios from "axios";

const API_URL = 'http://localhost:2000';

export const register = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}/register`, newUser);
    return response;
  } catch (error) {
    console.error("Register Failed", error);
    throw error
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    return response
  } catch (error) {
    console.error("login Failed", error);
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, email)
    return response
  } catch (error) {
    console.error("Failed", error);
    throw error
  }
}

export const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.href = '/';
}

export const checkToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/check-token`, { token }); // Assuming '/check-token' is your endpoint to check token validity
    return response;
  } catch (error) {
    console.error("failed", error);
    throw error;
  }
};

export const updatePassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_URL}/update-password/${token}`, { password });
    return response;
  } catch (error) {
    console.error("failed", error);
    throw error;
  }
}