import { Loader2 } from "lucide-react";

const BasicLoading = () => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <Loader2 className=" animate-spin duration-300 ease-in-out" />
    </div>
  );
};

export default BasicLoading;
