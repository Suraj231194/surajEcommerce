import { ApiError, createApiErrorFromResponse } from "./api-error.js";

const DEFAULT_TIMEOUT_MS = 10000;

function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem("authToken");
}

function createHeaders(baseHeaders = {}, data) {
  const headers = { ...baseHeaders };

  if (data !== undefined && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const token = getAuthToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }
  return response.text().catch(() => "");
}

export async function apiFetch(url, options = {}) {
  const {
    method = "GET",
    data,
    headers: inputHeaders = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    on401 = "throw", // "throw" | "returnNull" | "redirect"
    credentials = "include",
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      credentials,
      headers: createHeaders(inputHeaders, data),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });

    const payload = await parseResponseBody(response);

    if (response.status === 401 && on401 === "returnNull") {
      return { response, data: null };
    }

    if (!response.ok) {
      const error = createApiErrorFromResponse(response.status, payload);

      if (response.status === 401 && on401 === "redirect" && typeof window !== "undefined") {
        const nextPath = `${window.location.pathname}${window.location.search}`;
        window.location.href = `/login?next=${encodeURIComponent(nextPath)}`;
      }

      throw error;
    }

    return { response, data: payload };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error?.name === "AbortError") {
      throw new ApiError({
        status: 408,
        code: "TIMEOUT",
        message: "Request timeout.",
        retryable: true,
      });
    }

    throw new ApiError({
      status: 0,
      code: "NETWORK",
      message: "Network request failed.",
      retryable: true,
    });
  } finally {
    clearTimeout(timeout);
  }
}
