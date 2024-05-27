import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional(),
    DATABASE: z.string({
        required_error: "Database URL is required",
    }),
    DATABASE_PASSWORD: z.string({
        required_error: "Database password is required",
    })
})