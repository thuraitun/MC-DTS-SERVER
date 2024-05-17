import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

import app from "./app.js";
import ApiError from "./utils/apiError.js";

const port = process.env.PORT || 3000;


app.all('*', (req, res, next) => {
  
  res.status(404).json({
    status: "Fail",
    message: "The route is not supported",
  })
  next();
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
});



async function connectToDatabase() {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
    })
    .then(() => console.log("DB connection successfully!"));
}

async function main() {
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
