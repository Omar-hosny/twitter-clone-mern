import { axiosInstance } from "@/lib/axios-global";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetSuggestedUsers = () => {
  const getSuggesstedUsers = async () => {
    const res = await axiosInstance.get<User[]>("/user/suggested-users");
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: getSuggesstedUsers,
  });
  return { data, isLoading };
};

export default useGetSuggestedUsers;
