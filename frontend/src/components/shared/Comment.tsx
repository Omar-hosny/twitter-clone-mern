import { Comment as CommentType } from "@/types";
import AvatarImg from "./AvatarImg";
import getFirstTwoChar from "@/lib/getFirstTwoChar";

const Comment = ({ comment }: { comment: CommentType }) => {
  const shortName = getFirstTwoChar(comment.user.name ?? "");
  return (
    <article
      className="w-full flex items-center gap-2 border-b
       border-gray-200 p-2 hover:bg-gray-50 cursor-pointer"
    >
      {/* avatar */}
      <div>
        <AvatarImg imageUrl={comment.user.profileImage} shortName={shortName} />
      </div>
      {/* text */}
      <div className="w-full flex flex-col">
        <div className=" flex-1 flex items-center gap-1">
          <p className="text-gray-800 font-semibold">{comment.user.name}</p>
          <p className="text-gray-400">@{comment.user.username}</p>
        </div>
        <p className=" text-gray-800">{comment.text}</p>
      </div>
    </article>
  );
};

export default Comment;
