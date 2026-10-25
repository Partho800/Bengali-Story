'use client';

import * as React from 'react';
import { User } from '@/types/user';
import { APP_CONFIG } from '@/lib/constants';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = React.useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      // Check stored user data if any
      const stored = localStorage.getItem(APP_CONFIG.storageKeys.token);
      const storedUser = localStorage.getItem('bengali_story_user');
      if (stored && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = React.useCallback((userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem('bengali_story_user', JSON.stringify(userData));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(APP_CONFIG.storageKeys.token);
      localStorage.removeItem('bengali_story_user');
      document.cookie = `${APP_CONFIG.cookieKeys.token}=; path=/; max-age=0; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  }, []);

  const value = React.useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
