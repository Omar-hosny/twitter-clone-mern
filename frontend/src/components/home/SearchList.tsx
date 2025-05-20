import { Link } from "react-router";
import BasicLoading from "../shared/BasicLoading";
import { UserSearch } from "@/types";
import AvatarImg from "../shared/AvatarImg";

const SearchList = ({
  isLoading,
  users = [],
  error,
}: {
  isLoading: boolean;
  users: UserSearch[];
  error: Error | null;
}) => {
  if (isLoading) {
    return (
      <div className="flex  items-center justify-center">
        <BasicLoading />
      </div>
    );
  }
  if (!users) {
    return null;
  }
  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center p-2">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center w-full">
        <p className="text-red-500 text-2xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {users?.map((user) => (
        <li key={user._id}>
          <Link
            to={`/profile/${user.username}`}
            className="flex items-center gap-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <AvatarImg imageUrl={user.profileImage} shortName="OH" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-800 dark:text-gray-50">{user.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                @{user.username}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
