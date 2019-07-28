export class HttpStatusError extends Error {
    public readonly statusCode: number;

    public constructor(statusCode: number, errorMessage: string) {
        super(errorMessage);
        this.statusCode = statusCode;
    }
}
