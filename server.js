import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env"})

import app from "./app.js"

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD,
//   );
  
//   mongoose
//     .connect(DB, {
//       useNewUrlParser: true,
//     })
//     .then(() => console.log('DB connection successfully!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`)
});