import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/auth";
import { useQuery } from "@tanstack/react-query"
import type { UserProfile, UserProfileResponse } from "@backend/types";

 interface AuthState {
    isAuthenticated: boolean;
    user: UserProfile | null;
    error?: string | null;
}

interface AuthContextType {
    state: AuthState;
    login: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isError: boolean;
}

const AuthContext = createContext<AuthContextType>({
    state: {
        isAuthenticated: false,
        user: null,
        error: null,
    },
    login: async () => {},
    logout: () => {},
    isLoading: false,
    isError: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        error: null,
    });

    const authService = new AuthService();

    const { isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user: UserProfileResponse = await authService.logIntoSpotify();
            setCurrentUser({
                ...currentUser,
                isAuthenticated: true,
                user: user.user,
            })
            return user;
        },
    })

    const login = async () => {
        try {
            await authService.initiateLogin();
            setCurrentUser({
                ...currentUser,
                isAuthenticated: true,
            })
        } catch (error) {
            console.error("Error logging in:", error);
            setCurrentUser({
                ...currentUser,
                error: "Failed to login",
            })
        }
    }   

    const logout = () => {
        setCurrentUser({
            isAuthenticated: false,
            user: null,
            error: null,
        })
    }   
    
    return (
        <AuthContext.Provider value={{ state: currentUser, login, logout, isLoading, isError }}>
            { children }
        </AuthContext.Provider>
    )   
}

export const useAuth = () => useContext(AuthContext);