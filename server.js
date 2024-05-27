import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

import app from "./app.js";
import { ZodError } from "zod";
import { envSchema } from "./schema/env.schema.js";

function validateEnvVariables() {
	try {
		const runTime = process.env;
		envSchema.parse(runTime);
		console.log("Env variables validation completed.");
	} catch (error) {
		console.log("Env variables validation failed.");
		if (error instanceof ZodError) {
			console.log("Missing/Invalid variables:");
			console.log("##########################");

			error.errors.forEach(({ path }, idx) =>
				console.log(`${idx + 1}. ${path[0]}`),
			);
		}
		process.exit(1);
	}
}

const port = process.env.PORT || 3000;

app.all("*", (req, res, next) => {
	res.status(404).json({
		status: "Fail",
		message: "The route is not supported",
	});
	next();
});

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

async function connectToDatabase() {
	try {
		const DB = process.env.DATABASE.replace(
			"<PASSWORD>",
			process.env.DATABASE_PASSWORD,
		);
		mongoose.connect(DB, {
			useNewUrlParser: true,
		});
		console.log("DB connection successfully!");
	} catch (err) {
		console.log("DB connection failed!!!!!");
		console.error(err);
	}
}

async function main() {
	validateEnvVariables();
	await connectToDatabase();
	
	const server = app.listen(port, () => {
		console.log(`App running on port ${port}`);
	});
	process.on("unhandledRejection", (err) => {
		console.log("UnhandledRejection occurred.");
		console.log(err);
		server.close(() => {
			process.exit(1);
		});
	});
}

main();
