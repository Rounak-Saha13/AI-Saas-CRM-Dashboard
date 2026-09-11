import { connectDB } from "../config/db.js";
import app from "../server.js";

let databaseConnection;
const frontendOrigin = "https://ai-saas-crm-dashboard.vercel.app";

export default async function handler(req, res) {
    const origin = req.headers.origin;
    if (origin === frontendOrigin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        res.setHeader(
            "Access-Control-Allow-Headers",
            req.headers["access-control-request-headers"] || "Content-Type, Authorization"
        );
        res.setHeader("Vary", "Origin");
    }

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    try {
        databaseConnection ??= connectDB();
        await databaseConnection;
        return app(req, res);
    } catch (error) {
        console.error("Backend initialization failed:", error);
        return res.status(500).json({
            success: false,
            message: "Backend initialization failed. Check the deployed server configuration.",
        });
    }
}