import { Link, useParams } from "react-router";
import BasicLoading from "@/components/shared/BasicLoading";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/user/useGetProfile";
import { MoveLeft } from "lucide-react";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfo from "@/components/ProfileInfo";
import ProfilePosts from "@/components/ProfilePosts";

const ProfilePage = () => {
  const { username } = useParams();
  const { data: user, isLoading, error } = useGetProfile({ username });
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
  if (!user) return null;
  return (
    <div className="w-full flex items-center flex-col scrollbar-hide h-screen overflow-y-auto pb-96 ">
      <div
        className="flex w-full items-center gap-2 
        sticky top-0 z-10  backdrop-blur-3xl
      border-b border-gray-200 p-1.5"
      >
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="rounded-full mt-2"
        >
          <Link to="/">
            <MoveLeft />
          </Link>
        </Button>
        <span className="text-xl font-semibold">{user.name}</span>
      </div>
      <ProfileHeader user={user} />
      <ProfileInfo user={user} />
      <ProfilePosts userId={user._id} username={user.username} />
    </div>
  );
};

export default ProfilePage;
