import z from "zod";

const BASIC_APPOINTMENT = z.object({
	body: z.object({
		doctor: z.string(),
		username: z.string().min(3, "User name must be at least 3 characters long"),
		phone_number: z
			.string()
			.min(6, "Phone number must be at least 6 characters long")
			.max(12, "Phone number less than 12 characters long"),
		slot: z.string(),
		description: z
			.string()
			.min(10, "Description must be at least 10 characters long"),
	}),
});

export const CREATE_APPOINTMENT = z.object({
	body: BASIC_APPOINTMENT.shape.body.strict(),
});

export const UPDATE_APPOINTMENT = z.object({
	body: BASIC_APPOINTMENT.shape.body,
	params: z.object({
		id: z.string().min(20, "this id is not a valid"),
	}),
});
