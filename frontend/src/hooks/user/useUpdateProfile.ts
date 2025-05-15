import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios-global";
import editProfileSchema, {
  EditProfileSchema,
} from "@/validations/editProfileSchema";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const updateProfileData = async (data: EditProfileSchema) => {
    const res = await axiosInstance.put(`/user/update-user`, data);
    console.log(res.data);
    return res.data;
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });
  const editProfileMutation = useMutation({
    mutationFn: updateProfileData,
    mutationKey: ["edit-profile"],
    onSuccess: (data) => {
      console.log(data, "onSuccess");
      if (username) {
        queryClient.invalidateQueries({
          queryKey: [`profile-${username}`],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      reset();
    },
    onError: (error) => {
      console.log(error, "onError");
      toast.error("Could not update the profile data", {
        position: "top-center",
      });
    },
  });
  const onSubmit = handleSubmit((data) => {
    editProfileMutation.mutate(data);
  });
  return {
    register,
    onSubmit,
    errors,
    isLoading: editProfileMutation.isPending,
    setValue,
  };
};

export default useUpdateProfile;
