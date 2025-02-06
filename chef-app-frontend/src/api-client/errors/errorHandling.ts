// errorHandling.ts
import { useAuthStore } from "../../store/authStore";
import { AxiosError } from "axios";

const handleError = (error: Error) => {
  console.error(error);
  useAuthStore.getState().setError(error.message);
};

export const handleApiError = (error: AxiosError) => {
  if (error.response && error.response.status >= 400) {
    const errorMessage =
      error.response.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
        ? (error.response.data as { message: string }).message
        : "An unexpected error occurred";
    handleError(new Error(errorMessage));
  } else {
    handleError(new Error("Failed to connect to the server"));
  }
};
