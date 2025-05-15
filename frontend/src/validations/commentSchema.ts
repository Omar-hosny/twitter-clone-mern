import { z } from "zod";

const commentSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Comment cannot be empty" })
    .max(255, { message: "Comment is too long" }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
export default commentSchema;
