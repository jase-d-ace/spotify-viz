import { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/auth';
import { AuthState, AuthTokens } from '../types/auth';
interface AuthContextType {
    state: AuthState;
    login: () => Promise<void>;
    logout: () => void;
    handleCallback: (tokens: AuthTokens) => void;
}

const AuthContext = createContext<AuthContextType>({
    state: {
        isAuthenticated: false,
        user: null,
        tokens: null,
        error: null,
    },
    login: async () => {},
    logout: () => {},
    handleCallback: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        tokens: null,
        error: null,
    });

    const authService = new AuthService();

    const handleCallback = async (tokens: AuthTokens) => {
        try {
            setCurrentUser({
                ...currentUser,
                isAuthenticated: true,
                tokens
            })

            authService.handleCallback(tokens.accessToken);
        } catch (error) {
            console.error("Error handling callback in context:", error);
            setCurrentUser({
                isAuthenticated: false,
                user: null,
                tokens: null,
                error: "Failed to authenticate",
            })
            
        }
    }

    const login = async () => {
        try {
            const user = await authService.initiateLogin();
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
            tokens: null,
            error: null,
        })
    }   
    
    return (
        <AuthContext.Provider value={{ state: currentUser, login, logout, handleCallback }}>
            { children }
        </AuthContext.Provider>
    )   
}

export const useAuth = () => useContext(AuthContext);