import { axiosInstance } from "@/lib/axios-global";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const useGetPost = () => {
  const { postId } = useParams();
  const getPost = async () => {
    if (!postId) {
      throw new Error("Post ID is required");
    }
    const res = await axiosInstance.get<Post>(`/post/${postId}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: getPost,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetPost;
