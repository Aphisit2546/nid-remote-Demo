'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
    login: (phone: string) => Promise<void>;
    logout: () => void;
    setPhone: (phone: string) => void;
    pendingPhone: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rolling-shutter-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });
    const [pendingPhone, setPendingPhone] = useState<string | null>(null);

    // Load auth from localStorage on mount
    useEffect(() => {
        try {
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
        } catch {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = async (phone: string): Promise<void> => {
        const user: User = { phone };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
        setPendingPhone(null);
        // Wait for state to propagate
        await new Promise(resolve => setTimeout(resolve, 100));
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    const setPhone = (phone: string) => {
        setPendingPhone(phone);
    };

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
