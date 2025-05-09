import { User } from "@/types";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import Cookies from "js-cookie";
const handleSuccessLogin = (data: User, navigate: NavigateFunction) => {
  //   localStorage.setItem("user", JSON.stringify(data));
  // add user to cookies data for 1 hour
  Cookies.set("user", JSON.stringify(data), { expires: 1 / 24 });
  toast.success("Login successful");
  navigate("/");
};

export default handleSuccessLogin;
