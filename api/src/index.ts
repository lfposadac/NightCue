import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import cors from "cors";

dotenv.config();
connectDB();

// General router
import MainRoutes from "./routes/main.routes";

const app = express();
const port = 3000;

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all routes
app.use("/api/v1/", MainRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
