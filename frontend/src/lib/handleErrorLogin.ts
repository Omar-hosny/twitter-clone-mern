import { LoginSchema } from "@/validations/loginSchema";
import { SignUpSchema } from "@/validations/siignUpSchema";
import axios, { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

const handleErrorLogin = (
  error: AxiosError | unknown,
  setError: UseFormSetError<LoginSchema | SignUpSchema>
) => {
  let errorMessage = "An unexpected error occurred";

  if (axios.isAxiosError(error)) {
    errorMessage =
      error.response?.data?.error || error.message || "Network error";
  }

  setError("root", { message: errorMessage });
  console.log("Login failed", error);
};

export default handleErrorLogin;
