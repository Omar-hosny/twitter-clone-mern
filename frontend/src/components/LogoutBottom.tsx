import useLogout from "@/hooks/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LogoutBottom = () => {
  const { logout, error, isLoading } = useLogout();
  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-5/6 items-center gap-4 mt-4 p-2 border border-gray-200 cursor-pointer hover:bg-gray-100 rounded-4xl">
            <div>
              <Avatar
                style={{ width: "40px", height: "40px", margin: "0 2px" }}
              >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-start ">
              <p className="text-gray-800">name</p>
              <p className="text-gray-600">@username</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            <Button variant="ghost" onClick={logout}>
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LogoutBottom;
