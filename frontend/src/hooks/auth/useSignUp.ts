import { useNavigate } from "react-router";
import { axiosInstance } from "@/lib/axios-global";
import handleErrorLogin from "@/lib/handleErrorLogin";
import { SignUpSchema, signUpSchemaObject } from "@/validations/siignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useSignUp = () => {
  const navigate = useNavigate();
  const onSignUp = async (data: SignUpSchema) => {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  };

  //   get require validation from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchemaObject),
    mode: "onBlur",
  });

  const signUpMutation = useMutation({
    mutationFn: onSignUp,
    onSuccess: (data) => {
      console.log("Sign up successful", data);
      toast.success("Account created successfully", {
        duration: 4000,
        position: "top-center",
      });
      navigate("/sign-in");
    },
    onError: (error) => {
      console.log("Sign up failed", error);
      handleErrorLogin(error, setError);
    },
  });
  const onSubmit = handleSubmit((data) => {
    signUpMutation.mutate(data);
  });

  return {
    register,
    onSubmit,
    errors,
    isLoading: signUpMutation.isPending,
  };
};

export default useSignUp;
