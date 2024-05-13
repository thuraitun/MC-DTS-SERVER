class ApiError extends Error {
      constructor(message, statusCode, data = null) {
            super(message);
            this.statusCode = statusCode;
            this.data = data;

            Error.captureStackTrace(this,this.constructor)
      }
      static badRequest(message = 'Invalid Request', data = null) {
            return new ApiError(message, 400, data);
      }
      static notFound(message = 'Invalid Endpoint') {
            return new ApiError(message,404)
      }
};
export default ApiError;