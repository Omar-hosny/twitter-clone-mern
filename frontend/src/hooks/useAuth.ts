// import { axiosInstance } from "@/lib/axios-global";

import Cookies from "js-cookie";

function useAuth() {
  //   const getUser = async () => {
  //     const res = await axiosInstance.get("/auth/me");
  //     return res.data;
  //   };
  const currentUser = Cookies.get("user");
  if (currentUser) {
    console.log(JSON.parse(currentUser));
  }

  return { currentUser };
  //   return { getUser };
}

export default useAuth;
