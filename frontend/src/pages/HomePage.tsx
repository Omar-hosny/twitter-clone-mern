import CreatePostForm from "@/components/CreatePostForm";
import HomeTabs from "@/components/HomeTabs";
import Post from "@/components/shared/Post";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto scrollbar-hide ">
      <HomeTabs />
      <CreatePostForm />
      <div className="flex flex-col mt-2">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default HomePage;
