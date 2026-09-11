import { ApiError } from "../utils/ApiError.js";

/**404 handler for unmatched routes */
export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route Not Found: ${req.method} ${req.originalUrl}`);
  next(error);
}

//es-lint-disable-next-line no unused-vars
export const errorHandler = (err, req, res, next) => {
    let statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
    let message = err.message || "Internal Server Error";

    //Mongoose: bad ObjectID
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Resource not found. Invalid: ${err.path}:${err.value}`;
    }

    //Mongoose: duplicate key
    if (err.code  === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0] || "field";
        message = `Duplicate value entered for ${field} field, please choose another value`;
    }

    //Mongoose: schema validation
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    }

    if (process.env.NODE_ENV !== "production" && statusCode === 500) {
       console.error("X", err);
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
       ...(process.env.NODE_ENV !== "production" && statusCode === 500 ? { stack: err.stack } : {}),
    });
}

