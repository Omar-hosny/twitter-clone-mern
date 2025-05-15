import useGetUser from "@/hooks/user/useGetUser";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import AvatarImg from "./AvatarImg";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import useAddComment from "@/hooks/posts/useAddComment";

const CreateComment = () => {
  const { data: currentUser } = useGetUser();
  const shortName = getFirstTwoChar(currentUser?.name ?? "");
  const { register, onSubmit, errors, isLoading } = useAddComment();

  return (
    <div className="flex items-center mt-2 border-b border-gray-200 w-full">
      <div className="flex self-start justify-center p-2 relative">
        <AvatarImg imageUrl={currentUser?.profileImage} shortName={shortName} />
      </div>
      <form onSubmit={onSubmit} className="w-full flex flex-col relative">
        <Textarea
          placeholder="Post your reply"
          className="w-[98%] p-4"
          rows={4}
          {...register("text")}
        />
        {errors?.text && (
          <p className="text-red-500 text-sm py-2">{errors?.text?.message}</p>
        )}

        <span className="w-[98%] h-[1px] bg-gray-200 mt-2" />
        <div className="flex items-center ml-auto  p-2">
          <Button
            disabled={isLoading}
            type="submit"
            size="sm"
            className=" rounded-full px-4 py-2 mx-2"
          >
            reply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
