import useLogout from "@/hooks/auth/useLogout";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader2, LogOut, Moon, Sun } from "lucide-react";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import { User } from "@/types";
import AvatarImg from "../shared/AvatarImg";
import { useTheme } from "@/hooks/theme/useTheme";

const LogoutBottom = ({ user, loading }: { user: User; loading: boolean }) => {
  const { theme, setTheme } = useTheme();
  const { logout, error, isLoading } = useLogout();
  const firstTwoChar = getFirstTwoChar(user.name ?? "");
  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {loading || isLoading ? (
            <div
              className="flex w-5/6 items-center justify-center  mt-4 p-2 border
             border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 rounded-4xl"
            >
              <Loader2 className=" animate-spin duration-300 ease-in-out" />
            </div>
          ) : (
            <div
              className="flex w-5/6 items-center gap-2 mt-4 p-2 border border-gray-200  dark:border-gray-700
            cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-4xl"
            >
              <div>
                <AvatarImg
                  imageUrl={user.profileImage}
                  shortName={firstTwoChar}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-gray-800 dark:text-gray-50">{user?.name}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  @{user?.username}
                </p>
              </div>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:bg-gray-700">
            <Button variant="ghost" onClick={logout}>
              <LogOut /> Logout
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            {theme === "light" ? (
              <Button variant="ghost" onClick={() => setTheme("dark")}>
                <Moon /> Dark
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setTheme("light")}>
                <Sun /> light
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LogoutBottom;
