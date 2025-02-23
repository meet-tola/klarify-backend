import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
    console.error(`Error Occurred on PATH ${req.path}`, error);
    if (error instanceof Error) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: error?.message || "Invalid JSON format. Please check your request body and try again",
        });
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error?.message || "Unexpected error occurred",
    })
}