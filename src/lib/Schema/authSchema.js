import * as z from "zod";

// z now has all of zod functions and objects
export const registerSchema = z
    .object({
        name: z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters long").max(30, "Name must be less than or equal to 30 characters long"),
        email: z
            .string()
            .nonempty("Email is required")
            .regex(/^(?=.*\d)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/, "Email must be valid"),
        password: z
            .string()
            .nonempty("Password is required")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
        // will make object level validation on rePassword as it must match the password
        rePassword: z.string().nonempty("Password is required"),
        // custom validation on the input
        // refine must returns true or false
        dateOfBirth: z
            .string()
            .nonempty("Password is required")
            .refine(
                (date) => {
                    const currentYear = new Date().getFullYear();
                    const birthYear = new Date(date).getFullYear();
                    const age = currentYear - birthYear;

                    return age > 18;
                },
                { error: "Age must be greater than 18 years old" }
            ),
        gender: z
            .string()
            .nonempty("Gender is required")
            .transform((gender) => (gender == "m" ? "male" : "female")),
    })
    .refine((formData) => formData.password === formData.rePassword, {
        path: ["rePassword"],
        error: "Re-password must match password",
    });

export const logInSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .regex(/^(?=.*\d)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/, "Email must be valid"),
    password: z
        .string()
        .nonempty("Password is required")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
});
