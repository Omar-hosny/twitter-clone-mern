import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";
import useDeleteComent from "@/hooks/posts/useDeleteComent";

const DeleteCommentBtn = ({ commentId }: { commentId: string }) => {
  const { deleteCommentMutation, isLoading } = useDeleteComent();
  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(commentId);
  };
  return (
    <Button
      onClick={handleDeleteComment}
      disabled={isLoading}
      size="icon"
      variant="ghost"
      className=" cursor-pointer "
    >
      {isLoading ? (
        <Loader2 className="animate-spin duration-300 ease-in-out" />
      ) : (
        <Trash />
      )}
    </Button>
  );
};

export default DeleteCommentBtn;
