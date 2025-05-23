import { Button } from "../ui/button";
import { Repeat2 } from "lucide-react";
import { Post as PostType } from "@/types";
import useAddRepost from "@/hooks/posts/useAddRepost";
import { useState, useTransition } from "react";

const RepostBtn = ({ post, userId }: { post: PostType; userId: string }) => {
  const { respostMutation, isLoading } = useAddRepost();
  const [isPending, startTransition] = useTransition();
  // Initialize state with the current like status
  const [respostState, setRepostState] = useState({
    reposted: userId ? post.reposts.includes(userId) : false,
    repostedCount: post.reposts.length,
  });

  const handleRepost = () => {
    if (!userId) return;

    // Get the current like status
    const currentReposted = respostState.reposted;
    const currentCount = respostState.repostedCount;

    // Immediately update UI (optimistic update)
    setRepostState({
      reposted: !currentReposted,
      repostedCount: currentReposted ? currentCount - 1 : currentCount + 1,
    });

    startTransition(() => {
      // Send the request to the server
      respostMutation.mutate(post._id, {
        onError: () => {
          // If there's an error, revert to the previous state
          setRepostState({
            reposted: currentReposted,
            repostedCount: currentCount,
          });
        },
      });
    });
  };
  if (!post || !userId) return null;

  return (
    <Button
      disabled={isPending || isLoading}
      onClick={handleRepost}
      variant="ghost"
      className="rounded-full"
    >
      <span className="flex items-center gap-1">
        <Repeat2
          size={20}
          className={respostState.reposted ? " text-green-600" : ""}
        />
        <p>{respostState.repostedCount}</p>
      </span>
    </Button>
  );
};

export default RepostBtn;
