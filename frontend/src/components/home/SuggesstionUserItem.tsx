import { Link } from "react-router";
import { User } from "@/types";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import AvatarImg from "../shared/AvatarImg";
import FollowBtn from "../shared/FollowBtn";

const SuggesstionUserItem = ({ user }: { user: User }) => {
  const shortName = getFirstTwoChar(user.name ?? "");
  return (
    <div className=" flex items-center justify-between">
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center space-x-2"
      >
        <div>
          <AvatarImg
            imageUrl={user?.profileImage}
            shortName={shortName}
            width="40px"
            height="40px"
          />
        </div>
        <div className="flex flex-col items-start ">
          <p className="text-gray-800 dark:text-gray-50">{user.name}</p>
          <p className="text-gray-600 dark:text-gray-500 text-sm">
            @{user.username}
          </p>
        </div>
      </Link>
      <div>
        <FollowBtn userId={user._id} />
      </div>
    </div>
  );
};

export default SuggesstionUserItem;
