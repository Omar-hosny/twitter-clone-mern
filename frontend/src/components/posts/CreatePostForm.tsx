import { Image, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useGetUser from "@/hooks/user/useGetUser";
import getFirstTwoChar from "@/lib/getFirstTwoChar";
import useCreatePost from "@/hooks/posts/useCreatePost";
import AvatarImg from "../shared/AvatarImg";

const CreatePostForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const { data } = useGetUser();
  const shortName = getFirstTwoChar(data?.name ?? "");
  const { register, onSubmit, errors, isLoading, setValue, watch } =
    useCreatePost(setImageUrl);

  const isTextEmpty = watch("text")?.trim() === "";

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageUrl(imageUrl);
        setValue("image", imageUrl);

        // Do something with the image URL, such as display it in an image element
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center mt-2 border-b border-gray-100 dark:border-gray-700">
      <div className="flex self-start justify-center p-2 relative">
        <AvatarImg imageUrl={data?.profileImage} shortName={shortName} />
      </div>
      <form onSubmit={onSubmit} className="w-full flex flex-col">
        <Textarea
          placeholder="What's on your mind?"
          className="w-[98%] p-4"
          rows={4}
          {...register("text")}
          autoComplete="off new-password"
        />
        {errors?.text && (
          <p className="text-red-500 text-sm py-2">{errors?.text?.message}</p>
        )}
        {errors?.image && (
          <p className="text-red-500 text-sm">{errors?.image?.message}</p>
        )}
        {imageUrl && (
          <div className="flex justify-center items-center mt-2 p-2 relative">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setImageUrl("");
                setValue("image", "");
              }}
              size="icon"
              className="absolute top-2 right-2 bg-gray-50 dark:bg-gray-800"
            >
              <X className=" w-6! h-6!" />
            </Button>
            <img
              src={imageUrl}
              alt="Uploaded Image"
              className="w-full max-w-[300px] h-auto mt-2 mx-auto"
            />
          </div>
        )}
        <span className="w-[98%] h-[1px] bg-gray-100 dark:bg-gray-700 mt-2" />
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
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={handleImgChange}
          />
          <Button
            disabled={isLoading || isTextEmpty}
            type="submit"
            className=" rounded-full px-4 py-2 mx-2"
          >
            {isLoading ? "posting..." : "post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
