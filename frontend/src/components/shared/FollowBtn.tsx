import useFollow from "@/hooks/useFollow";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { User } from "@/types";
import { useState } from "react";

const FollowBtn = ({
  userId,
  currentUser,
}: {
  userId: string;
  currentUser?: User;
}) => {
  const { followMutation, isLoading } = useFollow();
  const [isHovering, setIsHovering] = useState(false);
  const isFollowing = currentUser?.following?.includes(userId);
  return (
    <>
      <Button
        onClick={() => {
          if (!userId) return;
          followMutation.mutate(userId);
        }}
        disabled={isLoading}
        variant={
          isFollowing ? (isHovering ? "destructive" : "outline") : "default"
        }
        size="sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="min-w-[90px] transition-all duration-200 ease-in-out cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className=" animate-spin duration-300 ease-in-out" />
        ) : (
          <span>
            {isFollowing ? (isHovering ? "unFollow" : "following") : "follow"}
          </span>
        )}
      </Button>
    </>
  );
};

export default FollowBtn;
