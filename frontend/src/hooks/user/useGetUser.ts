import { axiosInstance } from "@/lib/axios-global";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Custom hook to get the current user
// This hook uses the `useQuery` hook from react-query to fetch the current user data
const useGetUser = () => {
  const getUser = async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  };
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getUser,
  });
  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUser;
