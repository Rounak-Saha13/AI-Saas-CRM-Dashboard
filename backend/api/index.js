import { connectDB } from "../config/db.js";
import app from "../server.js";

let databaseConnection;

export default async function handler(req, res) {
    databaseConnection ??= connectDB();
    await databaseConnection;
    return app(req, res);
}