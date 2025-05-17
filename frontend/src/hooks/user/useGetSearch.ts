import { axiosInstance } from "@/lib/axios-global";
import { useQuery } from "@tanstack/react-query";

const useGetSearch = ({ query }: { query: string }) => {
  // Logic to fetch search results goes here
  const getSearchUsers = async () => {
    const res = await axiosInstance.get(`/user/search?query=${query}`);
    return res.data; // Assuming the response data is an array of users or similar structure
  };

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [`searchUsers`, query],
    queryFn: getSearchUsers,
    // enabled: !!query, // Only run the query if the query string is not empty
    // refetchOnWindowFocus: false, // Optional: Prevent refetching on window focus
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
  };
};

export default useGetSearch;
