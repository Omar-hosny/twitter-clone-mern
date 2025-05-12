import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";

const useFollow = () => {
  const { username } = useParams();
  // const location = useLocation()
  const queryClient = useQueryClient();
  const handleFollow = async (userId: string) => {
    const res = await axiosInstance.post(`/user/follow-unfollow/${userId}`);
    return res.data;
  };

  const followMutation = useMutation({
    mutationKey: ["follow"],
    mutationFn: handleFollow,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["suggested-users"] });
      toast.success(data.message, {
        position: "top-center",
      });
      if (username) {
        queryClient.invalidateQueries({
          queryKey: [`profile-${username}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`currentUser`],
        });
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong", {
        position: "top-center",
      });
    },
  });
  return {
    followMutation,
    isLoading: followMutation.isPending,
  };
};

export default useFollow;
