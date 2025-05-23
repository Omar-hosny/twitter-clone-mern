import { Comment as CommentType } from "@/types";
import AvatarImg from "./AvatarImg";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import { Link } from "react-router";
import DeleteCommentBtn from "../posts/DeleteCommentBtn";
import useGetUser from "@/hooks/user/useGetUser";

const Comment = ({ comment }: { comment: CommentType }) => {
  const { data: currentUser } = useGetUser();
  const shortName = getFirstTwoChar(comment.user.name ?? "");
  return (
    <article
      className="w-full flex items-center gap-2 border-b
       border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-black/20  cursor-pointer"
    >
      {/* avatar */}
      <Link to={`/profile/${comment.user.username}`}>
        <AvatarImg imageUrl={comment.user.profileImage} shortName={shortName} />
      </Link>
      {/* text */}
      <div className="w-full flex flex-col">
        <div className=" flex-1 flex items-center gap-1">
          <p className="text-gray-800 dark:text-gray-50  font-semibold">
            {comment.user.name}
          </p>
          <p className="text-gray-400 dark:text-gray-500">
            @{comment.user.username}
          </p>
        </div>
        <p className=" text-gray-800 dark:text-gray-200">{comment.text}</p>
      </div>
      {/* delete button */}
      {currentUser && currentUser._id === comment.user._id && (
        <DeleteCommentBtn commentId={comment._id} />
      )}
    </article>
  );
};

export default Comment;
