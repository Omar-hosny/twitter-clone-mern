import { axiosInstance } from "@/lib/axios-global";
import createPostSchema, {
  CreatePostSchema,
} from "@/validations/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useCreatePost = (setImageUrl: Dispatch<SetStateAction<string>>) => {
  const queryClient = useQueryClient();
  const createPost = async (data: { text: string; image?: string }) => {
    const res = await axiosInstance.post("/post/create", data);
    return res.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    mutationKey: ["create-post"],
    onSuccess: () => {
      console.log("post created");
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts-all"] });

      //   queryClient.invalidateQueries({ queryKey: ["posts-following"] });
      setImageUrl("");
      reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error creating post");
    },
  });
  const onSubmit = handleSubmit((data) => {
    createPostMutation.mutate(data);
  });
  return {
    register,
    isLoading: createPostMutation.isPending,
    errors,
    onSubmit,
    setValue,
  };
};

export default useCreatePost;
