import { axiosInstance } from "@/lib/axios-global";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  const getUser = async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  };
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getUser,
  });
  console.log(data);
  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUser;
