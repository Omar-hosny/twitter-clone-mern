import { NavLink } from "react-router";
import { Bell, House, User } from "lucide-react";
import { Button } from "../ui/button";
import LogoutBottom from "../auth/LogoutBottom";
import useGetUser from "@/hooks/user/useGetUser";

const Sidebar = () => {
  const { data: user, isLoading } = useGetUser();
  if (!user) return null;
  return (
    <aside className="w-full p-4 h-screen flex flex-col justify-between ">
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="ghost"
          className="p-1 mx-3 text-xl rounded-full w-fit h-fit hover:bg-gray-100 "
        >
          <NavLink to="/" className="flex items-center rounded-full">
            <div className="w-10 flex justify-center">
              {/* <House className="w-5! h-5!" /> */}
              <h1 className="text-3xl font-semibold">X</h1>
            </div>
            {/* <span className="ml-4"></span> */}
          </NavLink>
        </Button>
        <Button
          variant="ghost"
          className="p-4 text-xl rounded-xl w-full hover:bg-gray-100"
        >
          <NavLink to="/" className="flex items-center w-full">
            <div className="w-10 flex justify-center">
              <House className="w-5! h-5!" />
            </div>
            <span className="ml-4">Home</span>
          </NavLink>
        </Button>

        <Button
          variant="ghost"
          className="p-4 text-xl rounded-xl w-full hover:bg-gray-100"
        >
          <NavLink
            to={`/profile/${user.username}`}
            className="flex items-center w-full"
          >
            <div className="w-10 flex justify-center">
              <User className="w-5! h-5!" />
            </div>
            <span className="ml-4">Profile</span>
          </NavLink>
        </Button>

        <Button
          variant="ghost"
          className="p-4 text-xl rounded-xl w-full hover:bg-gray-100"
        >
          <NavLink to="/notfications" className="flex items-center w-full">
            <div className="w-10 flex justify-center">
              <Bell className="w-5! h-5!" />
            </div>
            <span className="ml-4">Notifications</span>
          </NavLink>
        </Button>
      </div>
      {/* bottom avatar and name for logout user  */}
      <LogoutBottom user={user} loading={isLoading} />
    </aside>
  );
};

export default Sidebar;
