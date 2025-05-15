import { Link } from "react-router";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

const HeaderTop = ({ text }: { text: string }) => {
  return (
    <div
      className="flex w-full items-center gap-2 
        sticky top-0 z-10  backdrop-blur-3xl
      border-b border-gray-200 p-1.5"
    >
      <Button
        asChild
        size="icon"
        variant="ghost"
        className="rounded-full mt-0.5"
      >
        <Link to="/">
          <MoveLeft />
        </Link>
      </Button>
      <span className="text-xl font-semibold">{text}</span>
    </div>
  );
};

export default HeaderTop;
