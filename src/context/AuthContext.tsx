"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, UserRole } from "@/types";
import { fetchApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: "customer" | "vendor";
    image?: string;
    businessName?: string;
  }) => Promise<{ requiresVerification?: boolean; email?: string; user?: User }>;
  verifyEmailOtp: (email: string, code: string) => Promise<User>;
  googleLogin: (data: {
    name: string;
    email: string;
    image?: string;
    role?: "customer" | "vendor";
  }) => Promise<User>;
  sendLoginOtp: (email: string) => Promise<{ message: string }>;
  verifyLoginOtp: (email: string, code: string) => Promise<User>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  getDashboardRouteForRole: (role?: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const getDashboardRouteForRole = useCallback((role?: UserRole): string => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "vendor":
        return "/dashboard/vendor";
      case "customer":
      default:
        return "/dashboard/customer";
    }
  }, []);

  // Initialize from localStorage and verify session with backend
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("wedplan_token");
        const storedUser = localStorage.getItem("wedplan_user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify with backend
          try {
            const res = await fetchApi<{ success: boolean; user: User }>("/auth/me", {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            if (res.success && res.user) {
              setUser(res.user);
              localStorage.setItem("wedplan_user", JSON.stringify(res.user));
            }
          } catch (err: any) {
            console.warn("Session token expired or invalid:", err.message);
            localStorage.removeItem("wedplan_token");
            localStorage.removeItem("wedplan_user");
            setUser(null);
            setToken(null);
          }
        } else {
          // Bridge a Better Auth session (Google OAuth) into the Express JWT session.
          // Google sign-in completes on the Better Auth callback; this syncs that
          // verified profile with the Express API so the navbar/dashboard update.
          try {
            const explicitlyLoggedOut =
              typeof window !== "undefined" &&
              localStorage.getItem("wedplan_explicit_logout") === "1";

            if (explicitlyLoggedOut) {
              return;
            }

            const session = await authClient.getSession();
            const authUser = session?.data?.user;

            if (authUser?.email) {
              const data = await fetchApi<{ success: boolean; token: string; user: User }>(
                "/auth/google",
                {
                  method: "POST",
                  body: JSON.stringify({
                    name: authUser.name || authUser.email.split("@")[0],
                    email: authUser.email,
                    image: authUser.image || undefined,
                  }),
                }
              );

              if (data.success && data.token && data.user) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem("wedplan_token", data.token);
                localStorage.setItem("wedplan_user", JSON.stringify(data.user));
                localStorage.removeItem("wedplan_explicit_logout");
              }
            }
          } catch (bridgeErr: any) {
            // No Better Auth session is a normal state for guests.
            console.debug("No Better Auth session to bridge:", bridgeErr?.message || bridgeErr);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{ success: boolean; token: string; user: User }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("wedplan_token", data.token);
      localStorage.setItem("wedplan_user", JSON.stringify(data.user));
      localStorage.removeItem("wedplan_explicit_logout");

      toast.success(`Welcome back, ${data.user.name}!`);
      return data.user;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    role: "customer" | "vendor";
    image?: string;
    businessName?: string;
  }): Promise<{ requiresVerification?: boolean; email?: string; user?: User }> => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{
        success: boolean;
        requiresVerification?: boolean;
        email?: string;
        message?: string;
        token?: string;
        user?: User;
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (data.requiresVerification) {
        toast.success(
          data.message || "Verification code sent! Please check your email inbox."
        );
        return { requiresVerification: true, email: data.email || payload.email };
      }

      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("wedplan_token", data.token);
        localStorage.setItem("wedplan_user", JSON.stringify(data.user));
        localStorage.removeItem("wedplan_explicit_logout");
        toast.success(`Account created successfully! Welcome to WedPlan.`);
        return { user: data.user };
      }

      return {};
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailOtp = async (email: string, code: string): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{ success: boolean; token: string; user: User }>(
        "/auth/verify-email",
        {
          method: "POST",
          body: JSON.stringify({ email, code }),
        }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("wedplan_token", data.token);
      localStorage.setItem("wedplan_user", JSON.stringify(data.user));
      localStorage.removeItem("wedplan_explicit_logout");

      toast.success(`Email verified! Welcome to WedPlan, ${data.user.name}.`);
      return data.user;
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired verification code");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (payload: {
    name: string;
    email: string;
    image?: string;
    role?: "customer" | "vendor";
  }): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{ success: boolean; token: string; user: User }>(
        "/auth/google",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("wedplan_token", data.token);
      localStorage.setItem("wedplan_user", JSON.stringify(data.user));
      localStorage.removeItem("wedplan_explicit_logout");

      toast.success(`Signed in with Google as ${data.user.name}`);
      return data.user;
    } catch (error: any) {
      toast.error(error.message || "Google sign in failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendLoginOtp = async (
    email: string
  ): Promise<{ message: string; demoOtp?: string }> => {
    try {
      const data = await fetchApi<{
        success: boolean;
        message: string;
        demoOtp?: string;
      }>("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      toast.success(data.message || "Verification code sent!");
      return { message: data.message, demoOtp: data.demoOtp };
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code");
      throw error;
    }
  };

  const verifyLoginOtp = async (email: string, code: string): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{ success: boolean; token: string; user: User }>(
        "/auth/verify-otp",
        {
          method: "POST",
          body: JSON.stringify({ email, code }),
        }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("wedplan_token", data.token);
      localStorage.setItem("wedplan_user", JSON.stringify(data.user));
      localStorage.removeItem("wedplan_explicit_logout");

      toast.success(`Welcome back, ${data.user.name}!`);
      return data.user;
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired verification code");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Prevent a lingering Better Auth (Google) session from silently
    // re-authenticating the user on the next page load after an explicit logout.
    if (typeof window !== "undefined") {
      localStorage.setItem("wedplan_explicit_logout", "1");
    }

    try {
      await authClient.signOut();
    } catch (e) {
      // ignore
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("wedplan_token");
    localStorage.removeItem("wedplan_user");
    toast.info("You have signed out.");
    router.push("/");
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem("wedplan_user", JSON.stringify(updated));
      return updated;
    });
  };

  const refreshUser = async () => {
    const currentToken = token || localStorage.getItem("wedplan_token");
    if (!currentToken) return;
    try {
      const res = await fetchApi<{ success: boolean; user: User }>("/auth/me", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem("wedplan_user", JSON.stringify(res.user));
      }
    } catch (err) {
      console.error("Refresh user error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        verifyEmailOtp,
        googleLogin,
        sendLoginOtp,
        verifyLoginOtp,
        logout,
        updateUser,
        refreshUser,
        getDashboardRouteForRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
