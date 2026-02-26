import { QueryClient } from "@tanstack/react-query";
import { apiFetch } from "./api-client.js";

export async function apiRequest(method, url, data, options = {}) {
  const { response } = await apiFetch(url, {
    method,
    data,
    ...options,
  });
  return response;
}

export const getQueryFn =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/");
    const { data } = await apiFetch(url, {
      on401: unauthorizedBehavior,
    });
    return data;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

