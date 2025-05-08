import { Image } from "lucide-react";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const CreatePostForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="flex items-center mt-2 border-b border-gray-100">
      <div className="flex self-start justify-center  relative">
        <Avatar style={{ width: "40px", height: "40px", margin: "0 10px" }}>
          <AvatarImage sizes="50px" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full flex flex-col">
        <Textarea
          placeholder="What's on your mind?"
          className="w-[98%] p-4"
          rows={4}
        />
        <span className="w-[98%] h-[1px] bg-gray-100 mt-2" />
        <div className="flex items-center justify-between p-2">
          <Button
            asChild
            size="icon"
            variant="ghost"
            onClick={handleUploadClick}
          >
            <Image className=" w-6! h-6!" />
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="images/*"
            id="image-upload"
            className="hidden"
          />
          <Button className=" rounded-full px-4 py-2 mx-2">Post</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
