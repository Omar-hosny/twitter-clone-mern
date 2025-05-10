import { PostsEnum } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

interface HomeTabsProps {
  activeTab: PostsEnum;
  setActiveTab: React.Dispatch<React.SetStateAction<PostsEnum>>;
}

const HomeTabs = ({ setActiveTab, activeTab }: HomeTabsProps) => {
  const queryClient = useQueryClient();

  const handleTabChange = (tab: PostsEnum) => {
    setActiveTab(tab);
    if (tab === PostsEnum.all) {
      queryClient.invalidateQueries({
        queryKey: [`posts-${PostsEnum.all}`],
      });
    } else if (tab === PostsEnum.following) {
      queryClient.invalidateQueries({
        queryKey: [`posts-${PostsEnum.following}`],
      });
    }
  };

  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex">
        <button
          onClick={() => handleTabChange(PostsEnum.all)}
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === PostsEnum.all ? "" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          For you
          {activeTab === PostsEnum.all && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => handleTabChange(PostsEnum.following)}
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === PostsEnum.following
              ? ""
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Following
          {activeTab === PostsEnum.following && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomeTabs;
