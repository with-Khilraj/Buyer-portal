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

module.exports = { signupSchema, loginSchema };