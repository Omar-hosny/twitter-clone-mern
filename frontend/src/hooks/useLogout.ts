import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-global";
import axios from "axios";
import Cookies from "js-cookie";
const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let errorMessage = "";
  const logoutAction = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  };

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      Cookies.remove("user");
      queryClient.clear();
      navigate("/sign-in");
    },
    onError: (error) => {
      console.log("Logout failed", error);
      errorMessage = "An unexpected error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error || error.message || "Network error";
      } else {
        errorMessage = "An unexpected error occurred";
      }
    },
  });

  return {
    logout: () => {
      logoutMutation.mutate();
    },
    error: errorMessage,
    isLoading: logoutMutation.isPending,
    isError: logoutMutation.isError,
  };
};

export default useLogout;
