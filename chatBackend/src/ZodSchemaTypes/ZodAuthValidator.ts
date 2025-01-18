import { z } from "zod";

export const registerZodValidator = z.object({
    name: z.string({ required_error: "Username is required.", invalid_type_error: "Username must be in string form." }).trim(),
    email: z.string({ required_error: "Email is required." }).email({ message: "Invalid email address." }).trim(),
    password: z.string({ required_error: "Password is required." }).trim().min(8, "Password must be at least 8 character."),
})

export type registerZodValidatorType = z.infer<typeof registerZodValidator>


export const loginZodValidator=z.object({
    email:z.string({required_error:"Email is required."}).email({message:"Invalid email address."}).trim(),
    password:z.string({required_error:"Password is required."}).trim().min(8,{message:"Password must be at least 8 character."})
})

export type loginZodValidatorType=z.infer<typeof loginZodValidator>