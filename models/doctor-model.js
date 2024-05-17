import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		specialist: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		experience: {
			type: String,
			required: true,
		},
		fee: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// Virtual Populate
doctorSchema.virtual("slots", {
	ref: "Slot",
	foreignField: "doctor",
	localField: "_id",
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
