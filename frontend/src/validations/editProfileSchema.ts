import { z } from "zod";

const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "name is required" })
    .max(50, { message: "name is too long max is 50" }),
  bio: z
    .string()
    .max(100, { message: "bio is too long max is 200 character" })
    .optional(),
  link: z
    .string()
    .max(50, { message: "link is too long max is 100 character" })
    .optional(),
  coverImage: z.string().optional(),
  profileImage: z.string().optional(),
  // password: z
  //   .string()
  //   .refine(
  //     (val) => {
  //       // If empty string or undefined, it's valid
  //       if (!val || val === "") return true;
  //       // Otherwise, check length
  //       return val.length >= 6 && val.length <= 50;
  //     },
  //     {
  //       message: "Password must be between 6 and 50 characters if provided",
  //     }
  //   )
  //   .optional(),
  // confirmPassword: z
  //   .string()
  //   .min(6, { message: "password is too short min is 6 character" })
  //   .optional(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });
export type EditProfileSchema = z.infer<typeof editProfileSchema>;

export default editProfileSchema;
