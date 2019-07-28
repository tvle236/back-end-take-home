import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { HttpStatusError } from "../models/httpStatusError";

interface ErrorBody {
    message: string;
}

const errorResponseMiddleware: ErrorRequestHandler = function(err: Error | {}, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HttpStatusError) {
        const errorBody: ErrorBody = {
            message: err.message
        };

        res.status(err.statusCode).json(errorBody);
    } else if (err instanceof Error) {
        const errorBody: ErrorBody = {
            message: err.message
        };

        res.status(500).json(errorBody);
    } else {
        const errorBody: ErrorBody = {
            message: JSON.stringify(err)
        };

        res.status(500).json(errorBody);
    }
};

export { errorResponseMiddleware };
