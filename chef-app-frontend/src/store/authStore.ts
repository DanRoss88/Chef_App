// authStore.ts
import { create } from 'zustand';
import { AuthService } from '../api-client/services/auth';


export interface AuthState {
  token: string;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void,
}

export type User = {
  id: string;
  username: string;
};


const useAuthStore = create((set) => {
  const initialState: AuthState = {
    token: '',
    user: null,
    isLoading: false,
    error: null,
    logout: () => set({ token: '', user: null, isLoading: false, error: null }),
  };

  return {
    ...initialState,

  loginUser(credentials: { username: string; password: string }) {
    set({ isLoading: true, error: null });
    return AuthService.login(credentials);
  },

  logout() {
    set({
      token: '',
      user: null,
      isLoading: false,
      error: null
    });
    localStorage.removeItem('authToken');
  }
}
});
export default useAuthStore;