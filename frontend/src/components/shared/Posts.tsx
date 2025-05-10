import { Post as PostType } from "@/types";
import Post from "./Post";

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
