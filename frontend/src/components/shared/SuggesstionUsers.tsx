import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const SuggesstionUsers = () => {
  return (
    <aside className="w-full flex flex-col p-2 gap-2 border border-gray-200 rounded-xl">
      <div className="flex items-center  flex-1 justify-center">
        <h2 className="text-2xl mb-4">Who to follow</h2>
      </div>

      <div className=" flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-start ">
            <p className="text-gray-800">name</p>
            <p className="text-gray-600 text-sm">@username</p>
          </div>
        </div>
        <div>
          <Button variant="outline">Follow</Button>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-start ">
            <p className="text-gray-800">name</p>
            <p className="text-gray-600 text-sm">@username</p>
          </div>
        </div>
        <div>
          <Button variant="outline">Follow</Button>
        </div>
      </div>
    </aside>
  );
};

export default SuggesstionUsers;
