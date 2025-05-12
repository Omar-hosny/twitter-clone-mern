import { axiosInstance } from "@/lib/axios-global";
import { Notification } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetNotifications = () => {
  const getNotifications = async () => {
    const res = await axiosInstance.get<Notification[]>("/notifications");
    return res.data;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  return {
    data,
    isLoading,
    error,
  };
};

export default useGetNotifications;
