import * as z from "zod";

export const changePasswordSchema = z
    .object({
        password: z
            .string()
            .nonempty("Current password is required")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
        newPassword: z
            .string()
            .nonempty("New password is required")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
    })
    .refine((data) => data.password !== data.newPassword, {
        message: "New password must be different from the current password",
        path: ["newPassword"],
    });
