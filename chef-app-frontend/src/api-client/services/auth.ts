// authService.ts
import useAuthStore from "../../store/authStore";
import { apiInstance } from "./baseService"; // Use shared instance

export const AuthService = {
  login(credentials: { username: string; password: string }): Promise<void> {
    return apiInstance.post("/auth/login", credentials)
      .then((response) => {
        useAuthStore.setState({
          token: response.data.token || '',
          user: response.data.user || null,
          isLoading: false
        });
      })
      .catch(error => {
        useAuthStore.setState({ error: 'Login failed', isLoading: false });
        throw error;
      });
  },
  
  logout(): void {
    (useAuthStore.getState() as { logout: () => void }).logout();
  },

  validateToken(): Promise<boolean> {
    return apiInstance.get("/auth/validate")
      .then(() => true)
      .catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          (useAuthStore.getState() as { logout: () => void }).logout();
          throw new Error("Invalid token");
        }
        return false;
      });
  },
};