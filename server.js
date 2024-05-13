import dotenv from "dotenv";
import mongoose from "mongoose";
const port = process.env.PORT || 3000;

dotenv.config({ path: "./.env" })

import app from "./app.js";

async function connectToDatabase() {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successfully!'));
};

async function main() {
  await connectToDatabase();
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
  });
  process.on('unhandledRejection', (err) => {
    console.log('UnhandledRejection occurred.');
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });
};

main();