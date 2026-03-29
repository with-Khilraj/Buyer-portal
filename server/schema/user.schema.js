const { z } = require("zod");

const signupSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    name: z
        .string()
        .min(1, "Name is required")
        .min(3, "Name must be at least 3 characters long"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
    gender: z
        .enum(['male', 'female'], {
            errorMap: () => ({ message: "Please select a valid gender" })
        }),
});

// Login Validation
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

// Update Profile Validation
const updateProfileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
});

// Update Password Validation
const updatePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
}).refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password cannot be the same as current password",
    path: ["newPassword"],
});

module.exports = { signupSchema, loginSchema, updateProfileSchema, updatePasswordSchema };