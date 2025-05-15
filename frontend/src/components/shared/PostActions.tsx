import { useState, useTransition } from "react";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "../ui/button";
import useLikePost from "@/hooks/posts/useLikePost";
import { Post as PostType } from "@/types";

const PostActions = ({ post, userId }: { post: PostType; userId: string }) => {
  const { likeMutation } = useLikePost();
  const [isPending, startTransition] = useTransition();
  // Initialize state with the current like status
  const [likeState, setLikeState] = useState({
    liked: userId ? post.likes.includes(userId) : false,
    likesCount: post.likes.length,
  });

  const handleLike = () => {
    if (!userId) return;

    // Get the current like status
    const currentLiked = likeState.liked;
    const currentCount = likeState.likesCount;

    // Immediately update UI (optimistic update)
    setLikeState({
      liked: !currentLiked,
      likesCount: currentLiked ? currentCount - 1 : currentCount + 1,
    });

    startTransition(() => {
      // Send the request to the server
      likeMutation.mutate(post._id, {
        onError: () => {
          // If there's an error, revert to the previous state
          setLikeState({
            liked: currentLiked,
            likesCount: currentCount,
          });
        },
      });
    });
  };

  return (
    <div className="w-full flex items-center justify-evenly pt-2 text-gray-800 text-sm">
      <Button asChild variant="ghost" className="rounded-full">
        <span className="flex items-center gap-1">
          <MessageCircle size={20} />
          <p>{post.comments.length}</p>
        </span>
      </Button>
      <Button variant="ghost" className="rounded-full">
        <span className="flex items-center gap-1">
          <Repeat2 size={20} />
          <p>2</p>
        </span>
      </Button>
      <Button
        disabled={isPending}
        variant="ghost"
        className="rounded-full"
        onClick={handleLike}
      >
        <span className="flex items-center gap-1">
          <Heart
            size={20}
            className={likeState.liked ? "fill-red-500 text-red-500" : ""}
          />
          <p>{likeState.likesCount}</p>
        </span>
      </Button>
    </div>
  );
};

export default PostActions;
