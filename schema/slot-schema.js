import z from "zod";

const BASIC_SLOT = z.object({
  body: z.object({
    start_date: z.string().datetime(),
    end_data: z.string().datetime(),
    doctor: z.string().min(20, "this id is not a valid"),
  }),
});

export const CREATE_SLOT = z.object({
  body: BASIC_SLOT.shape.body.strict(),
});

export const UPDATE_SLOT = z.object({
  body: BASIC_SLOT.shape.body,
  params: z.object({
    id: z.string().min(20, "this id is not a valid"),
  }),
});
