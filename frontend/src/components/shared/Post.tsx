import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import PostActions from "./PostActions";
import { Post as PostType } from "@/types";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import { Link } from "react-router";

const Post = ({ post }: { post: PostType }) => {
  const shortName = getFirstTwoChar(post.user.name ?? "");
  return (
    <article className="w-full flex items-center gap-2 border-b border-gray-200 p-2">
      {/* avatar */}

      <Link
        to={`/profile/${post.user.username}`}
        className="flex self-start justify-center  relative"
      >
        <Avatar
          style={{
            width: "40px",
            height: "40px",
            margin: "0 10px",
            borderRadius: "full",
          }}
        >
          <AvatarImage
            style={{ borderRadius: "100%" }}
            src={post.user.profileImg || "/svgs/no-user.jpg"}
          />
          <AvatarFallback>{shortName}</AvatarFallback>
        </Avatar>
      </Link>
      {/* right side of post */}
      <div className="w-full flex flex-col">
        {/* name and username */}
        <Link
          to={`/profile/${post.user.username}`}
          className="flex items-center gap-1"
        >
          <p className="text-gray-800 font-semibold">{post.user.name}</p>
          <p className="text-gray-400">@{post.user.username}</p>
        </Link>
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
        <PostActions
          likesCount={post.likes.length}
          commentsCount={post.comments.length}
        />
      </div>
    </article>
  );
};

export default Post;
