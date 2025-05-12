import { Post as PostType } from "@/types";
import Post from "./Post";

const Posts = ({ posts }: { posts: PostType[] }) => {
  if (!posts.length)
    return (
      <div className="w-full flex items-center justify-center">
        <p className="text-gray-500 p-3 text-xl">No posts yet</p>
      </div>
    );
  return (
    <div className="w-full flex flex-col">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
