export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Mark this error as operational (expected)
        Error.captureStackTrace(this, this.constructor);    
    }
    
    }   