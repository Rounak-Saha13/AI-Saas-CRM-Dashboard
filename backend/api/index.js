import { connectDB } from "../config/db.js";
import app from "../server.js";

let databaseConnection;
const frontendOrigin = "https://ai-saas-crm-dashboard.vercel.app";

export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
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
        return res.status(204).end();
    }

    databaseConnection ??= connectDB();
    await databaseConnection;
    return app(req, res);
}