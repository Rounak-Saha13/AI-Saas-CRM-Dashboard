import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    const header = req.headers.authorization;

    // Get token from Authorization header
    if (header && header.startsWith("Bearer ")) {
        token = header.split(" ")[1];
    }

    // No token
    if (!token) {
        return next(new ApiError(401, "Not authorized, no token"));
    }

    // Verify token
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        throw new ApiError(401, "Not authorized, token failed");
    }

    // Find user from token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    // Attach user to request
    req.user = user;

    next();
});