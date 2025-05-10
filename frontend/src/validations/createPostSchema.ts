import { z } from "zod";

const createPostSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Please enter at least 1 character" })
    .max(280, { message: "the maximum length is 280" }),
  image: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export default createPostSchema;
