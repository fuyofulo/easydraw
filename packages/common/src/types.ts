import { z } from 'zod';

export const SignupSchema = z.object({
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z.string(),
})

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(30)
})