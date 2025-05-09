// import { axiosInstance } from "@/lib/axios-global";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   bio: string;
//   profileImg: string;
//   coverImg: string;
//   followers: string[];
//   following: string[];
//   link: string;
// }

function useAuth() {
  //   const getUser = async () => {
  //     const res = await axiosInstance.get("/auth/me");
  //     return res.data;
  //   };
  const currentUser = !!localStorage.getItem("user");

  return { currentUser };
  //   return { getUser };
}

export default useAuth;
