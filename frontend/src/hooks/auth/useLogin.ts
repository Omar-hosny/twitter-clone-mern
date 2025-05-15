import { axiosInstance } from "@/lib/axios-global";
import { loginSchema, LoginSchema } from "@/validations/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import handleSuccessLogin from "@/lib/handleSuccessLogin";
import handleErrorLogin from "@/lib/handleErrorLogin";
const useLogin = () => {
  const navigate = useNavigate();
  // function to handle login API call
  // using axiosInstance to make a POST request to the login endpoint
  const onLogin = async (data: LoginSchema) => {
    const res = await axiosInstance.post("/auth/signin", data);
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
      handleSuccessLogin(data.user, navigate);
    },
    onError: (error) => {
      handleErrorLogin(error, setError);
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
