"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  bio?: string | null;
  githubUrl?: string | null;
}

interface UserContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  setCurrentUser: (user: UserProfile) => void;
  refreshUsers: () => Promise<void>;
  createUser: (name: string, email: string, role?: string) => Promise<UserProfile | null>;
}

const defaultUser: UserProfile = {
  id: "usr_vanshika",
  name: "Vanshika Bhatia",
  email: "vanshika@pitchpulse.dev",
  role: "Founder & Full-Stack Lead",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Building PitchPulse. Passionate about AI developer tooling, full-stack systems, and product architecture.",
  githubUrl: "https://github.com/vanshikavbhatia",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([defaultUser]);

  const refreshUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success && data.users.length > 0) {
        setAllUsers(data.users);
        // Retain current user if still valid, or default to Vanshika
        const found = data.users.find((u: UserProfile) => u.id === currentUser.id);
        if (found) {
          setCurrentUser(found);
        } else {
          setCurrentUser(data.users[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load users:", e);
    }
  };

  const createUser = async (name: string, email: string, role: string = "Founder") => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        await refreshUsers();
        return data.user;
      }
    } catch (e) {
      console.error("Error creating user:", e);
    }
    return null;
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrentUser,
        refreshUsers,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
