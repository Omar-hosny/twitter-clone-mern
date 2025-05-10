import { Ellipsis, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import useDeletePost from "@/hooks/useDeletePost";
import useGetUser from "@/hooks/useGetUser";

const DeletePostBtn = ({
  postId,
  userPostId,
}: {
  postId: string;
  userPostId: string;
}) => {
  const { data: user } = useGetUser();
  const { deleteMutaion, isLoading } = useDeletePost();

  //  check if user is the owner of the post
  if (user && user._id !== userPostId) {
    return null;
  }
  if (!user) return null; // if user is not logged in, return null, else return the rest

  const handleDelete = () => {
    deleteMutaion.mutate(postId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className=" cursor-pointer ">
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
          <DialogClose asChild>
            <Button size="sm" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
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
