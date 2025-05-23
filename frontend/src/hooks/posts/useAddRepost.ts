import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";
import { toast } from "sonner";

const useAddRepost = () => {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const repost = async (postId: string) => {
    const res = await axiosInstance.post(`/post/repost/${postId}`);
    return res.data;
  };

  const respostMutation = useMutation({
    mutationFn: repost,
    mutationKey: ["repost"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            typeof query.queryKey[0] === "string" &&
            query.queryKey[0].includes("posts")
          );
        },
      });
      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      }
      if (pathname === "/") {
        queryClient.invalidateQueries({
          queryKey: ["posts-all"],
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    },
  });
  return {
    respostMutation,
    isLoading: respostMutation.isPending,
  };
};

export default useAddRepost;
