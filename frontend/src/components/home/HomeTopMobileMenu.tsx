import useGetUser from "@/hooks/user/useGetUser";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import AvatarImg from "../shared/AvatarImg";

import { Button } from "../ui/button";
import Sidebar from "../shared/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
const HomeTopMobileMenu = () => {
  const { data: user } = useGetUser();

  const firstTwoChar = getFirstTwoChar(user?.name ?? "");
  return (
    <div className="w-full md:hidden flex items-center p-2.5 border-b border-gray-200 dark:border-gray-700">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-fit h-fit"
          >
            <AvatarImg
              height="30px"
              width="30px"
              imageUrl={user?.profileImage}
              shortName={firstTwoChar}
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar />
          {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>

      <div className="text-xl font-semibold flex-1 flex items-center justify-center">
        X-clone
      </div>
    </div>
  );
};

export default HomeTopMobileMenu;
