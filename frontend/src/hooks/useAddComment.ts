import { axiosInstance } from "@/lib/axios-global";
import commentSchema, { CommentSchema } from "@/validations/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";

const useAddComment = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const addComment = async (comment: CommentSchema) => {
    if (!postId) {
      throw new Error("Post ID is required");
    }
    const res = await axiosInstance.post(
      `/post/add-comment/${postId}`,
      comment
    );
    return res.data;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });
  const addCommentMutation = useMutation({
    mutationKey: ["addComment"],
    mutationFn: addComment,
    onSuccess: () => {
      console.log("Comment added successfully");
      // Invalidate the query to refetch the post data
      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      }
      toast.success("Comment added successfully", {
        duration: 3000,
        position: "top-center",
      });
      reset();
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    addCommentMutation.mutate(data);
  });

  return {
    register,
    onSubmit,
    errors,
    isLoading: addCommentMutation.isPending,
  };
};

export default useAddComment;
