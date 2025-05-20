import BasicLoading from "@/components/shared/BasicLoading";
import Comment from "@/components/shared/Comment";
import CreateComment from "@/components/shared/CreateComment";
import HeaderTop from "@/components/shared/HeaderTop";
import Post from "@/components/shared/Post";
import useGetPost from "@/hooks/posts/useGetPost";

// This component will display the details of a specific post
function PostDetails() {
  const { data: post, isLoading, error } = useGetPost();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BasicLoading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main
      className=" relative flex flex-col items-center pb-96 w-full h-screen
     overflow-y-auto scrollbar-hide "
    >
      <HeaderTop text="Post" />
      <Post post={post} />
      <CreateComment />
      <div className="w-full flex flex-col">
        {post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </main>
  );
}

export default PostDetails;
