/**
 * Custom error class that carries an HTTP status code alongside the message,
 * so the error-handling middleware can respond with the correct status.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ApiError;
