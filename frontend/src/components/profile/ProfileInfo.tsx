import { formatJoinDate } from "@/lib/formatJoinDate";
import { User } from "@/types";

const ProfileInfo = ({ user }: { user: User }) => {
  if (!user) return null;
  return (
    <div className="flex w-full flex-col items-start px-3 py-2 gap-2 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full flex flex-col gap-0.5">
        <h1 className="font-semibold text-xl">{user.name}</h1>
        <p className="text-gray-500">@{user.username}</p>
      </div>
      <p>{user.bio}</p>

      <span className="text-gray-400 px-2">
        {formatJoinDate(user.createdAt)}
      </span>
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
        <span className="flex items-center gap-1">
          <p className="font-semibold">{user.following.length}</p> following{" "}
        </span>
        <span className="flex items-center gap-1">
          <p className="font-semibold">{user.followers.length}</p> followers
        </span>
      </div>
    </div>
  );
};

export default ProfileInfo;
