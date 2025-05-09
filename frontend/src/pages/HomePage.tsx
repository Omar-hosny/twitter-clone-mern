import CreatePostForm from "@/components/CreatePostForm";
import HomeTabs from "@/components/HomeTabs";
import Post from "@/components/shared/Post";

const HomePage = () => {
  return (
    <div className="flex flex-col h-full ">
      <HomeTabs />
      <CreatePostForm />
      <div className="flex flex-col mt-2 pb-96">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default HomePage;
