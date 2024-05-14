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
                  .max(60, 'Specialist can only have 60 characters at most.'),
            experienc: z
                  .number()
                  .min(1, 'Experience must have at least 1 characters.')
                  .max(3, 'Experience can only have 3 characters at most.'),
            fee: z
                  .number()
                  .min(1, 'Fee must have at least 1 characters.')
                  .max(7, 'Fee can only have 7 characters at most.'),
            genter: z
                  .string()
                  .min(1, 'Genter must have at least 1 characters.')
                  .max(6, 'Genter can only have 6 characters at most.')
      }),
});

export const CREATE_DOCTOR = z.object({
      body: BASE_USER.shape.body.strict()
});

export const UPDATE_DOCTOR = z.object({
      body: BASE_USER.shape.body,
      params: z.object({
            id: z.string().refine(isObjectIdOrHexString),
      }),
});
