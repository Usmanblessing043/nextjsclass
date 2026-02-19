import {z} from 'zod'


export const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character"),
    email: z.email('Invalid email address'),
    password: z.string('password must be a string').min(6, 'Password must be at least 6 character')
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),


})

export type signupFormData = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string('password must be a string').min(6, 'Password must be at least 6 character')
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),


})
export type loginFormData = z.infer<typeof loginSchema>