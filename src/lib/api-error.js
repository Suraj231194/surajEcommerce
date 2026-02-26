export class ApiError extends Error {
  constructor({
    status = 0,
    code = "UNKNOWN",
    message = "Something went wrong. Please try again.",
    retryable = false,
    details = null,
  } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.retryable = retryable;
    this.details = details;
  }
}

function getStatusCode(status) {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 404) return "NOT_FOUND";
  if (status >= 500) return "SERVER_ERROR";
  if (status === 408) return "TIMEOUT";
  return "REQUEST_FAILED";
}

function fromPayload(payload) {
  if (!payload) {
    return "";
  }
  if (typeof payload === "string") {
    return payload;
  }
  if (typeof payload?.message === "string") {
    return payload.message;
  }
  if (typeof payload?.error === "string") {
    return payload.error;
  }
  return "";
}

export function toHumanErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) {
    return fallback;
  }

  if (error instanceof ApiError) {
    switch (error.code) {
      case "UNAUTHORIZED":
        return "Your session expired. Please sign in again.";
      case "NOT_FOUND":
        return "We could not find that item. Showing similar options.";
      case "SERVER_ERROR":
        return "Server is busy right now. Please try again in a moment.";
      case "TIMEOUT":
        return "Request timed out. Please check your internet and retry.";
      case "NETWORK":
        return "You appear to be offline. Check internet connection and retry.";
      default:
        return error.message || fallback;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function createApiErrorFromResponse(status, payload) {
  const code = getStatusCode(status);
  const payloadMessage = fromPayload(payload);

  const defaultMessage =
    code === "UNAUTHORIZED"
      ? "Unauthorized request."
      : code === "NOT_FOUND"
      ? "Resource not found."
      : code === "SERVER_ERROR"
      ? "Server error."
      : "Request failed.";

  return new ApiError({
    status,
    code,
    message: payloadMessage || defaultMessage,
    retryable: code === "SERVER_ERROR" || code === "TIMEOUT",
    details: payload,
  });
}

