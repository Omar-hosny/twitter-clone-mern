import { Heart, MessageCircle, Repeat2 } from "lucide-react";

const PostActions = () => {
  return (
    <div className="w-full flex items-center justify-evenly pt-2 pb-1 text-gray-600 text-sm">
      <span className="flex items-center gap-2">
        <MessageCircle size={20} />
        <p>3</p>
      </span>
      <span className="flex items-center gap-2">
        <Repeat2 size={20} />
        <p>6</p>
      </span>
      <span className="flex items-center gap-2">
        <Heart size={20} />
        <p>23</p>
      </span>
    </div>
  );
};

export default PostActions;
