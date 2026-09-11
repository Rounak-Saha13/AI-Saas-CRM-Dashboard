import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import {notFound, errorHandler} from "./middlewares/error.middleware.js";

import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"

const app = express();

/* ───────────────────────────────── Middleware ───────────────────────────────── */
app.use
(cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

/* ───────────────────────────────── Routes ───────────────────────────────── */
app.get("/api/health", (req, res) => 
    res.json({success: true, status:"ok",service: "Nexora API"})
);

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ───────────────────────────────── Error Handling ───────────────────────────────── */
app.use(notFound);
app.use(errorHandler);  

/* ───────────────────────────────── Boot ───────────────────────────────── */
const PORT = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }   
};

if (process.env.NODE_ENV !== "production") {
    start();
}

export default app;