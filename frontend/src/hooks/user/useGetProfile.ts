import { axiosInstance } from "@/lib/axios-global";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = ({ username }: { username: string | undefined }) => {
  const getProfile = async () => {
    if (!username) return;
    const res = axiosInstance.get<User>(`/user/profile/${username}`);
    return (await res).data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [`profile-${username}`],
    queryFn: getProfile,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetProfile;
