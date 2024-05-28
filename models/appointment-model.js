import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
	{
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Doctor",
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		phone_number: {
			type: String,
			required: true,
		},
		slot: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Slot",
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true
		},
		age: {
			type: String,
			required: true
		},
		gender: {
			type: String,
			required: true
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

appointmentSchema.pre(/^find/, function (next) {
	this.populate({
		path: "doctor",
		select: "name specialist email experiences gender bio",
	});

	next();
});

appointmentSchema.pre(/^find/, function (next) {
	this.populate({
		path: "slot",
		select: "start_date end_date",
	});

	next();
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
