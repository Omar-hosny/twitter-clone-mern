import useGetSuggestedUsers from "@/hooks/user/useGetSuggestedUsers";
import BasicLoading from "./BasicLoading";
import SuggesstionUserItem from "../home/SuggesstionUserItem";

const SuggesstionUsers = () => {
  const { data: users, isLoading } = useGetSuggestedUsers();
  return (
    <aside className="w-full flex flex-col p-2 gap-3 border border-gray-200 rounded-xl">
      <div className="flex items-center  flex-1 justify-center">
        <h2 className="text-2xl mb-4">Who to follow</h2>
      </div>

      {isLoading && <BasicLoading />}

      {users?.map((user) => (
        <SuggesstionUserItem key={user._id} user={user} />
      ))}
    </aside>
  );
};

export default SuggesstionUsers;
