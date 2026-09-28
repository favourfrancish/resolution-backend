import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import thoughtRoutes from "./routes/thoughts.js";
import resolutionRoutes from "./routes/resolutions.js";
import bibleRoutes from "./routes/bible.js";
import favouriteRoutes from "./routes/favourites.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://resolution-gamma.vercel.app"],
    credentials: true,
  }),
);

app.use(cookieParser());

const PORT = process.env.PORT || 4000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Resolution API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", thoughtRoutes);
app.use("/api", resolutionRoutes);
app.use("/api", bibleRoutes);
app.use("/api", favouriteRoutes);