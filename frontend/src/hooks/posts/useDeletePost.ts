import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const useDeletePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deletePost = async (postId: string) => {
    const res = await axiosInstance.delete(`/post/delete/${postId}`);
    return res.data;
  };
  const deleteMutaion = useMutation({
    mutationFn: deletePost,
    mutationKey: ["delete-post"],
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["posts-all"],
      });
      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
        navigate("/");
      }

      toast.success("Post deleted successfully", {
        position: "top-center",
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
    deleteMutaion,
    isLoading: deleteMutaion.isPending,
  };
};

export default useDeletePost;
