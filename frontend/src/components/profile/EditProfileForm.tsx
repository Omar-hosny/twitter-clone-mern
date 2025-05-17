import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { SwitchCamera } from "lucide-react";
import useGetUser from "@/hooks/user/useGetUser";
import BasicLoading from "../shared/BasicLoading";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";

const EditProfileForm = () => {
  const coverRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const { data: user, error, isLoading } = useGetUser();
  const {
    register,
    onSubmit,
    isLoading: updateLoading,
    setValue,
    errors,
  } = useUpdateProfile();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const onProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue("profileImage", result);
        setImgUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue("coverImage", result);
        setCoverUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <BasicLoading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm p-2">something went wrong..</p>
      </div>
    );
  }
  if (!user) return null;
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col space-y-3">
      <div className="w-full max-h-[150px] relative group">
        <img
          src={coverUrl || user.coverImage || "/svgs/cover-img.webp"}
          className="w-full h-full object-cover group-hover:opacity-80"
          alt="cover-image"
        />
        <button
          onClick={() => {
            if (coverRef.current) {
              coverRef.current.click();
            }
          }}
          type="button"
          aria-label="change profile image"
          title="change cover image"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            p-1 rounded-full
             bg-black/30 hover:bg-black/50 hover:opacity-80 text-white"
        >
          <SwitchCamera />
        </button>
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          className="hidden"
          id="change-cover"
          onChange={onCoverChange}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        {/* profile image */}
        <div
          className="group flex items-center w-[75px] h-[75px] -mt-[70px]
        border 
         mx-4 p-1 overflow-hidden rounded-full relative"
        >
          <img
            src={imgUrl || user.profileImage || "/svgs/no-user.jpg"}
            className="rounded-full object-cover  w-full h-full  group-hover:opacity-80"
            alt="profile-image"
          />
          <button
            onClick={() => {
              if (imgRef.current) {
                imgRef.current.click();
              }
            }}
            type="button"
            aria-label="change profile image"
            title="change profile image"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            p-1 rounded-full
             bg-black/30 hover:bg-black/50 text-white"
          >
            <SwitchCamera />
          </button>
          <input
            ref={imgRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="change-profile"
            onChange={onProfileChange}
          />
        </div>
      </div>
      {(errors?.profileImage || errors?.coverImage) && (
        <p className="text-red-500 text-sm p-2">
          {errors?.profileImage?.message || errors?.coverImage?.message}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          defaultValue={user.name}
          {...register("name")}
        />
        {errors?.name && (
          <p className="text-red-500 text-sm p-2">{errors?.name?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Input
          type="text"
          id="bio"
          //   placeholder={user.bio ?? "Enter your bio"}
          defaultValue={user.bio ?? ""}
          placeholder="Enter your bio"
          {...register("bio")}
        />
        {errors?.bio && (
          <p className="text-red-500 text-sm p-2">{errors?.bio?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="link">Link</Label>
        <Input
          type="text"
          id="link"
          placeholder={"Enter your link"}
          defaultValue={user.link}
          {...register("link")}
        />
        {errors?.link && (
          <p className="text-red-500 text-sm p-2">{errors?.link?.message}</p>
        )}
      </div>
      {/* <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder={"Enter your new password"}
          {...register("password")}
        />
        {errors?.password && (
          <p className="text-red-500 text-sm p-2">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">ConfirmPassword</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder={"Confirm your password"}
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <p className="text-red-500 text-sm p-2">
            {errors.confirmPassword.message}
          </p>
        )}
      </div> */}

      <DialogClose asChild>
        <Button disabled={updateLoading} type="submit">
          {updateLoading ? "Updating..." : "Update"}
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button size="sm" type="button" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </form>
  );
};

export default EditProfileForm;
