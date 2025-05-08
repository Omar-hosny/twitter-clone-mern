import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Bell, House, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  return (
    <aside className="w-full p-4 h-screen flex flex-col justify-between ">
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="ghost"
          className="p-4 text-xl rounded-xl w-full hover:bg-gray-100"
        >
          <NavLink to="/" className="flex items-center w-full">
            <div className="w-10 flex justify-center">
              <House className="w-5! h-5!" />
            </div>
            <span className="ml-4 hidden md:flex">Home</span>
          </NavLink>
        </Button>

        <Button
          variant="ghost"
          className="p-4 text-xl rounded-xl w-full hover:bg-gray-100"
        >
          <NavLink to="/profile/username" className="flex items-center w-full">
            <div className="w-10 flex justify-center">
              <User className="w-5! h-5!" />
            </div>
            <span className="ml-4 hidden md:flex">Profile</span>
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
            <span className="ml-4 hidden md:flex">Notifications</span>
          </NavLink>
        </Button>
      </div>
      {/* bottom avatar and name  */}
      <div className="flex w-5/6 items-center gap-4 mt-4 p-2 border border-gray-200 cursor-pointer hover:bg-gray-100 rounded-4xl">
        <div className="p-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-start ">
          <p className="text-gray-800">name</p>
          <p className="text-gray-600">@username</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
