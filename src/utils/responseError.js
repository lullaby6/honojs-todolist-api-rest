export default class ResponseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "ResponseError";
        this.statusCode = statusCode;
    }
}