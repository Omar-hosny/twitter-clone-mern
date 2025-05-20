import { Ellipsis, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useDeletePost from "@/hooks/posts/useDeletePost";

const DeletePostBtn = ({
  postId,
  userPostId,
  currentUserId,
}: {
  postId: string;
  userPostId: string;
  currentUserId: string | null;
}) => {
  const { deleteMutaion, isLoading } = useDeletePost();

  if (!currentUserId) return null;
  //  check if user is the owner of the post
  if (currentUserId !== userPostId) {
    return null;
  }

  const handleDelete = () => {
    deleteMutaion.mutate(postId);
  };

  const stopPropagation = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.SyntheticEvent<HTMLButtonElement, Event>
  ) => {
    e.stopPropagation();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => stopPropagation(e)}
          size="icon"
          variant="ghost"
          className=" cursor-pointer "
        >
          {isLoading ? (
            <Loader2 className="animate-spin duration-300 ease-in-out" />
          ) : (
            <Ellipsis />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose onAbort={(e) => stopPropagation(e)} asChild>
            <Button size="sm" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild onAbort={(e) => stopPropagation(e)}>
            <Button
              size="sm"
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostBtn;
