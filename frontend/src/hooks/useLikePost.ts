import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useLikePost = () => {
  const queryClient = useQueryClient();
  const likePost = async (postId: string) => {
    const res = await axiosInstance.post(`/post/like-unlike/${postId}`);
    return res.data;
  };
  const likeMutation = useMutation({
    mutationFn: likePost,
    mutationKey: ["like-post"],
    onSuccess: (data) => {
      console.log(data);
      // queryClient.invalidateQueries({
      //   queryKey: ["posts-all"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["posts-following-posts"],
      // });
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            typeof query.queryKey[0] === "string" &&
            query.queryKey[0].includes("posts")
          );
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    },
  });
  return {
    likeMutation,
    isLoading: likeMutation.isPending,
  };
};

export default useLikePost;
