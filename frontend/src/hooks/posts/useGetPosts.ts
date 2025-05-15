import { axiosInstance } from "@/lib/axios-global";
import { PostsEnum } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface GetPostsParams {
  type: PostsEnum;
  userId?: string;
}
const useGetPosts = ({ type, userId }: GetPostsParams) => {
  // get the endpoint url based on the type and userId
  const getEndPointUrl = () => {
    let endPoint = type as string;
    if (endPoint.includes(":userId") && userId) {
      endPoint = endPoint.replace(":userId", userId);
    }
    return `/post/${endPoint}`;
  };

  const getPosts = async () => {
    const endPoint = getEndPointUrl();
    const res = await axiosInstance.get(endPoint);
    return res.data;
  };

  const queryKey = userId ? ["user-posts", userId] : [`posts-${type}`]; // if userId is not provided, use ["all-posts"] as the queryKey, otherwis

  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: getPosts,
  });
  return { data, isLoading, error };
};

export default useGetPosts;
