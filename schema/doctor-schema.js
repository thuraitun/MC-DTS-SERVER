import z from "zod";

const BASE_USER = z.object({
	body: z.object({
		email: z.string().email("Invalid email."),
		name: z
			.string()
			.min(2, "Name must have at least 2 characters.")
			.max(50, "Name can only have 50 characters at most."),
		specialist: z
			.string()
			.min(2, "Specialist must have at least 2 characters.")
			.max(60, "Specialist can only have 60 characters at most."),
		experiences: z
			.string()
			.min(1, "Experiences must have at least 1 characters.")
			.max(20, "Experiences can only have 20 characters at most."),
		fee: z
			.string()
			.min(1, "Fee must have at least 1 characters.")
			.max(8, "Fee can only have 7 characters at most."),
		gender: z
			.string()
			.min(1, "Gender must have at least 1 characters.")
			.max(6, "Gender can only have 6 characters at most."),
	}),
});

export const CREATE_DOCTOR = z.object({
	body: BASE_USER.shape.body.strict(),
});

export const UPDATE_DOCTOR = z.object({
	body: BASE_USER.shape.body,
	params: z.object({
		id: z.string(),
	}),
});
