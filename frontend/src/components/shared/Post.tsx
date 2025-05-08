import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import PostActions from "./PostActions";

const Post = () => {
  return (
    <article className="w-full flex items-center gap-2 border-b border-gray-200 p-2">
      {/* avatar */}
      <div className="flex self-start justify-center  relative">
        <Avatar
          style={{
            width: "40px",
            height: "40px",
            margin: "0 10px",
            borderRadius: "full",
          }}
        >
          <AvatarImage
            style={{ borderRadius: "100%" }}
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {/* right side of post */}
      <div className="w-full flex flex-col">
        {/* name and username */}
        <div className="flex items-center gap-1">
          <p className="text-gray-800">omar</p>
          <p className="text-gray-500">@yrfavomar</p>
        </div>
        {/* post body */}
        <div className="flex flex-col gap-3 mt-2">
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatibus.
          </p>
          <img
            className="w-full h-auto rounded-lg"
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            alt="postimage"
          />
        </div>
        <PostActions />
      </div>
    </article>
  );
};

export default Post;
