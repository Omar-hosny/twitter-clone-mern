import { Link, useNavigate } from "react-router";
import PostActions from "./PostActions";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import { Post as PostType } from "@/types";
import DeletePostBtn from "../DeletePostBtn";
import useGetUser from "@/hooks/useGetUser";
import AvatarImg from "./AvatarImg";

const Post = ({ post }: { post: PostType }) => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();

  const shortName = getFirstTwoChar(post.user.name ?? "");
  const handlePostClick = () => {
    navigate(`/post/${post._id}`);
  };

  const stopPropagation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  if (!post) return null;
  return (
    <div
      onClick={handlePostClick}
      className="w-full flex items-center gap-2 border-b
       border-gray-200 p-2 hover:bg-gray-50 cursor-pointer"
    >
      {/* avatar */}
      <Link
        onClick={stopPropagation}
        to={`/profile/${post.user.username}`}
        className="flex self-start justify-center relative"
      >
        <AvatarImg imageUrl={post.user.profileImage} shortName={shortName} />
      </Link>
      {/* right side of post */}
      <div className="w-full flex flex-col">
        {/* name and username */}
        <div className="flex-1 flex items-center justify-between">
          <Link
            onClick={stopPropagation}
            to={`/profile/${post.user.username}`}
            className="flex items-center gap-1"
          >
            <p className="text-gray-800 font-semibold">{post.user.name}</p>
            <p className="text-gray-400">@{post.user.username}</p>
          </Link>
          {/* delete post button */}
          <DeletePostBtn
            currentUserId={user?._id ?? null}
            postId={post._id}
            userPostId={post.user._id}
          />
        </div>

        {/* post body */}
        <div className="flex flex-col gap-3 mt-2">
          <p className=" text-gray-800">{post.text}</p>
          {post.image && (
            <img
              className="w-full object-contain max-h-[450px]  rounded-lg"
              src={post.image}
              alt="postimage"
            />
          )}
        </div>
        <PostActions post={post} userId={user?._id ?? ""} />
      </div>
    </div>
  );
};

export default Post;
