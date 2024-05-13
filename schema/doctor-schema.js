import z from "zod";

const BASE_USER = z.object({
      body: z.object({
            email: z.string().email('Invalid email.'),
            name: z
                  .string()
                  .min(2, 'Name must have at least 2 characters.')
                  .max(50, 'Name can only have 50 characters at most.'),
            specialist: z
                  .string()
                  .min(2, 'Specialist must have at least 2 characters.')
                  .max(60, 'Specialist can only have 50 characters at most.')
      }),
});