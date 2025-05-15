import { PostsEnum } from "@/types";
import { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import useGetPosts from "@/hooks/posts/useGetPosts";
import Posts from "./shared/Posts";
import BasicLoading from "./shared/BasicLoading";

const ProfilePosts = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [activeTab, setActiveTab] = useState<PostsEnum>(PostsEnum.userPosts);

  // if activeTab is userPosts, then currentId is userId, else currentId is username
  const currentId = activeTab === PostsEnum.userPosts ? username : userId;

  const {
    data: posts,
    error,
    isLoading,
  } = useGetPosts({ type: activeTab, userId: currentId });
  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <BasicLoading />
      </div>
    );
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!posts) return null;
  return (
    <section className="w-full flex flex-col">
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Posts posts={posts} />
    </section>
  );
};

export default ProfilePosts;
