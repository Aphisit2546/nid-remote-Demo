'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
    login: (phone: string) => Promise<void>;
    logout: () => void;
    setPhone: (phone: string) => void;
    pendingPhone: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rolling-shutter-auth';
const PENDING_PHONE_KEY = 'rolling-shutter-pending-phone';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });
    const [pendingPhone, setPendingPhone] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    // Load auth and pendingPhone from storage on mount
    useEffect(() => {
        setMounted(true);
        try {
            // Load auth state
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (stored) {
                const user = JSON.parse(stored) as User;
                setAuthState({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }

            // Load pending phone from sessionStorage
            const storedPhone = sessionStorage.getItem(PENDING_PHONE_KEY);
            if (storedPhone) {
                setPendingPhone(storedPhone);
            }
        } catch {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = useCallback(async (phone: string): Promise<void> => {
        const user: User = { phone };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        sessionStorage.removeItem(PENDING_PHONE_KEY);
        setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
        setPendingPhone(null);
        // Wait for state to propagate
        await new Promise(resolve => setTimeout(resolve, 100));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        sessionStorage.removeItem(PENDING_PHONE_KEY);
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
        setPendingPhone(null);
    }, []);

    const setPhone = useCallback((phone: string) => {
        sessionStorage.setItem(PENDING_PHONE_KEY, phone);
        setPendingPhone(phone);
    }, []);

    // Don't render children until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500">กำลังโหลด...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout,
            setPhone,
            pendingPhone,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
