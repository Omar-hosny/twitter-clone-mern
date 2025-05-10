import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import { Link } from "react-router";

const SuggesstionUserItem = ({ user }: { user: User }) => {
  const shortName = getFirstTwoChar(user.name ?? "");
  return (
    <div className=" flex items-center justify-between">
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center space-x-2"
      >
        <div>
          <Avatar>
            <AvatarImage src={user.profileImg || "/svgs/no-user.jbg"} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-start ">
          <p className="text-gray-800">{user.name}</p>
          <p className="text-gray-600 text-sm">@{user.username}</p>
        </div>
      </Link>
      <div>
        <Button size="sm">Follow</Button>
      </div>
    </div>
  );
};

export default SuggesstionUserItem;
