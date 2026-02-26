import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient.js";
import { apiFetch } from "../lib/api-client.js";
import { toHumanErrorMessage } from "../lib/api-error.js";

export function useAuth() {
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const { data } = await apiFetch("/api/auth/me", { on401: "returnNull" });
      if (!data) {
        return null;
      }
      return data.user;
    },
    retry: false,
  });
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      try {
        const { data } = await apiFetch("/api/auth/login", {
          method: "POST",
          data: credentials,
        });
        return data;
      } catch (error) {
        throw new Error(toHumanErrorMessage(error, "Login failed"));
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (credentials) => {
      try {
        const { data } = await apiFetch("/api/auth/signup", {
          method: "POST",
          data: credentials,
        });
        return data;
      } catch (error) {
        throw new Error(toHumanErrorMessage(error, "Signup failed"));
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await apiFetch("/api/auth/logout", {
          method: "POST",
        });
        return data;
      } catch (error) {
        throw new Error(toHumanErrorMessage(error, "Logout failed"));
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: (email, password) => loginMutation.mutateAsync({ email, password }),
    signup: (email, password, firstName, lastName) =>
      signupMutation.mutateAsync({ email, password, firstName, lastName }),
    logout: () => logoutMutation.mutateAsync(),
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
