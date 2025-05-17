import { Notification } from "@/types";
import { Heart, UserRoundPlus } from "lucide-react";

import getFirstTwoChar from "@/lib/getFirstTwoChar";
import AvatarImg from "../shared/AvatarImg";

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const shortName = getFirstTwoChar(notification.from.name ?? "");
  if (!notification) return null;
  return (
    <article
      className={` w-full flex items-center gap-2 border-b
         border-gray-200 p-2
         ${notification.isRead ? "" : "bg-gray-100"}
         `}
    >
      <div className="flex self-start justify-center p-2">
        {notification.type === "follow" ? (
          <UserRoundPlus />
        ) : (
          <Heart className="fill-red-500 text-red-500 " />
        )}
      </div>
      <div className="flex items-start flex-col gap-2 w-full">
        <div>
          <AvatarImg
            imageUrl={notification.from.profileImage}
            shortName={shortName}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>{notification.from.name}</span>
          <span>
            {notification.type === "like"
              ? " liked your post."
              : " followed you."}
          </span>
        </div>
      </div>
    </article>
  );
};

export default NotificationItem;
