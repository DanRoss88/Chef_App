// baseService.ts
import useAuthStore from "../../store/authStore";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: 'your_base_url',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Use the logout action from the store
      useAuthStore.setState(() => ({
        token: '',
        user: null,
        isLoading: false,
        error: null
      }));
      localStorage.removeItem('authToken');
      throw error;
    }
    return Promise.reject(error);
  }
);

export { apiInstance };