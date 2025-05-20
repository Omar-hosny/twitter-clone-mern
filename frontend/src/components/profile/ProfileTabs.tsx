import { PostsEnum } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileTabsProps {
  activeTab: PostsEnum;
  setActiveTab: React.Dispatch<React.SetStateAction<PostsEnum>>;
}

const ProfileTabs = ({ setActiveTab, activeTab }: ProfileTabsProps) => {
  const queryClient = useQueryClient();

  const handleTabChange = (tab: PostsEnum) => {
    setActiveTab(tab);
    if (tab === PostsEnum.userPosts) {
      queryClient.invalidateQueries({
        queryKey: [`posts-${PostsEnum.userPosts}`],
      });
    } else if (tab === PostsEnum.liked) {
      queryClient.invalidateQueries({
        queryKey: [`posts-${PostsEnum.liked}`],
      });
    }
  };
  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <div className="flex">
        <button
          onClick={() => handleTabChange(PostsEnum.userPosts)}
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === PostsEnum.userPosts
              ? ""
              : "text-gray-500 dark:text-gray-100  hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Posts
          {activeTab === PostsEnum.userPosts && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => handleTabChange(PostsEnum.liked)}
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === PostsEnum.liked
              ? ""
              : "text-gray-500 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Liked
          {activeTab === PostsEnum.liked && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;
