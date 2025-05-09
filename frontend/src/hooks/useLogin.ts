import { axiosInstance } from "@/lib/axios-global";
import { loginSchema, LoginSchema } from "@/validations/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
const useLogin = () => {
  const navigate = useNavigate();
  // function to handle login API call
  // using axiosInstance to make a POST request to the login endpoint
  const onLogin = async (data: LoginSchema) => {
    const res = await axiosInstance.post("/auth/signin", data);
    console.log(res);
    return res.data;
  };

  // useForm hook from react-hook-form to manage form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // handle login mutation using react-query
  const loginMutation = useMutation({
    mutationFn: onLogin,

    onSuccess: (data) => {
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Login successful", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    },
    onError: (error) => {
      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error || error.message || "Network error";
      }

      setError("root", { message: errorMessage });
      console.log("Login failed", error);
    },
  });

  //  handle form submission by calling the onSubmit function returned by useForm
  // and passing the form data to the login mutation
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    register,
    errors,
    onSubmit,
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
  };
};

export default useLogin;
