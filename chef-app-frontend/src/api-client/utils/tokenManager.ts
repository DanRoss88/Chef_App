// tokenManager.ts
import { useEffect, useRef } from 'react';
import useAuthStore, { AuthState } from "../../store/authStore";
import { AuthService } from "../services/auth";

export const setToken = (token: string) => {
  localStorage.setItem("auth_token", token);
  (useAuthStore.getState() as { setToken: (token: string) => void }).setToken(token);
};

export const getToken = () => {
  return localStorage.getItem("auth_token") || "";
};

export const clearToken = () => {
  localStorage.removeItem("auth_token");
  (useAuthStore.getState() as AuthState).logout();
};


export const TokenExpirationChecker = () => {
  const mountedRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await AuthService.validateToken();
      } catch (error) {
        if (mountedRef.current) {
          (useAuthStore.getState() as AuthState).logout();
        }
      }
    }, 1000 * 60); // Check every minute

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);
};