import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AvatarImg = ({
  imageUrl,
  shortName,
  width = "40px",
  height = "40px",
}: {
  imageUrl?: string;
  shortName: string;
  width?: string;
  height?: string;
}) => {
  return (
    <>
      <Avatar
        className="rounded-full overflow-hidden"
        style={{
          width,
          height, // Explicit height to match width for perfect circle
        }}
      >
        <AvatarImage
          className="w-full h-full object-cover"
          src={imageUrl || "/svgs/no-user.jpg"}
          loading="lazy"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center">
          {shortName}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarImg;
