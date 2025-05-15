import CreatePostForm from "@/components/CreatePostForm";
import HomeTabs from "@/components/HomeTabs";
import BasicLoading from "@/components/shared/BasicLoading";
import Posts from "@/components/shared/Posts";
import useGetPosts from "@/hooks/posts/useGetPosts";
import { PostsEnum } from "@/types";
import { useState } from "react";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<PostsEnum>(PostsEnum.all);
  const { data: posts, isLoading, error } = useGetPosts({ type: activeTab });

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-y-auto scrollbar-hide">
        <p className="text-2xl text-center">Something went wrong</p>
      </div>
    );

  return (
    <div className="flex flex-col h-screen overflow-y-auto scrollbar-hide">
      <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CreatePostForm />
      <div className="flex flex-col mt-2 pb-96">
        {isLoading ? <BasicLoading /> : <Posts posts={posts} />}
      </div>
    </div>
  );
};

export default HomePage;
