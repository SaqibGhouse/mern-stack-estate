 export const errorHandler = (satusCode, message) => {
     const error = new Error(message);
     error.statusCode = satusCode;
     error.message = message;
    return error;
}