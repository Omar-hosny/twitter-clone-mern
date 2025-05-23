import { axiosInstance } from "@/lib/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";

const useDeleteComent = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  // Function to delete a comment
  const deleteComment = async (commentId: string) => {
    const res = await axiosInstance.delete(
      `/post/delete-comment/${postId}/${commentId}`
    );
    return res.data;
  };

  const deleteCommentMutation = useMutation({
    mutationKey: ["delete-comment"],
    mutationFn: deleteComment,
    onSuccess: () => {
      console.log("Comment deleted successfully");
      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      }
      toast.success("Comment deleted successfully", {
        position: "top-center",
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error("Error deleting comment", error);
      toast.error("Error deleting comment", {
        position: "top-center",
        duration: 3000,
      });
    },
  });
  return { deleteCommentMutation, isLoading: deleteCommentMutation.isPending };
};

export default useDeleteComent;
