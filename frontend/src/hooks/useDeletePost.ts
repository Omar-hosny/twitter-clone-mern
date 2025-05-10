import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeletePost = () => {
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
