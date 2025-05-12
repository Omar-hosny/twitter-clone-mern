import useGetUser from "@/hooks/useGetUser";
import { User } from "@/types";
import FollowBtn from "./shared/FollowBtn";
import EditProfileBtn from "./EditProfileBtn";
import AvatarImg from "./shared/AvatarImg";
import getFirstTwoChar from "@/lib/getFirstTwoChar";

const ProfileHeader = ({ user }: { user: User }) => {
  const { data: currentUser } = useGetUser();
  const shortName = getFirstTwoChar(user?.name ?? "");
  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-h-[200px]">
        <img
          src={user.coverImage || "/svgs/cover-img.webp"}
          className="w-full object-cover h-full "
          alt="cover-image"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        {/* profile image */}
        <div className="flex items-center justify-center -mt-12 ml-4">
          <AvatarImg
            imageUrl={user?.profileImage}
            shortName={shortName}
            width="80px"
            height="80px"
          />
        </div>

        {/* edit or follow btn */}
        <div className="flex items-center px-2 mt-3 mr-2">
          {currentUser && currentUser._id === user._id ? (
            <EditProfileBtn />
          ) : (
            <FollowBtn userId={user._id} currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
