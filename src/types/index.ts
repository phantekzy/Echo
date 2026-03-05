import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),

  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),

  orgName: z.string().min(2, { error: "Organization name is too short" }),
});

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export const FileUploadSchema = z.object({
  orgId: z.coerce.number().positive("Invalid Organization ID"),
});

export type FileUploadInput = z.infer<typeof FileUploadSchema>;
