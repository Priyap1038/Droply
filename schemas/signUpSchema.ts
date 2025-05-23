import { EXPORT_MARKER } from "next/dist/shared/lib/constants";
import * as z from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is requied" })
    .min(8, { message: "Password should be minimum of 8 character" }),
  passwordConfirmation: z
    .string()
    .min(1, { message: "Please confirm your password" }),
})
.refine((data)=>data.password === data.passwordConfirmation, {
    message:"Password do not match",
    path:["passwordConfrimation"]
})
