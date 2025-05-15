import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";
import { toast } from "sonner";

const useLikePost = () => {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  // Function to like or unlike a post
  // This function will be called when the user clicks the like button
  const likePost = async (postId: string) => {
    const res = await axiosInstance.post(`/post/like-unlike/${postId}`);
    return res.data;
  };
  const likeMutation = useMutation({
    mutationFn: likePost,
    mutationKey: ["like-post"],
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
    likeMutation,
    isLoading: likeMutation.isPending,
  };
};

export default useLikePost;
