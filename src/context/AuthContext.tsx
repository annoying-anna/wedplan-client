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
  }) => Promise<User>;
  googleLogin: (data: {
    name: string;
    email: string;
    image?: string;
    role?: "customer" | "vendor";
  }) => Promise<User>;
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
  }): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{ success: boolean; token: string; user: User }>(
        "/auth/register",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("wedplan_token", data.token);
      localStorage.setItem("wedplan_user", JSON.stringify(data.user));

      toast.success(`Account created successfully! Welcome to WedPlan.`);
      return data.user;
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
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

      toast.success(`Signed in with Google as ${data.user.name}`);
      return data.user;
    } catch (error: any) {
      toast.error(error.message || "Google sign in failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
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
        googleLogin,
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
