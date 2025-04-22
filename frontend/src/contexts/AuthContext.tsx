import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth';
import { AuthState, AuthTokens } from '../types/auth';
import { SpotifyUser } from '../types/spotify';
interface AuthContextType {
    state: AuthState;
    login: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
    state: {
        isAuthenticated: false,
        user: null,
        tokens: null,
        error: null,
    },
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        tokens: null,
        error: null,
    });

    const handleCallback = async (code: string) => {
        const authService = new AuthService();
        try {
            const newState = await authService.handleCallback(code);
            setCurrentUser(newState);
            window.location.hash = "";
        } catch (error) {
            console.error("Error handling callback:", error);
            setCurrentUser({
                isAuthenticated: false,
                user: null,
                tokens: null,
                error: "Failed to authenticate",
            })
            
        }
    }
    useEffect(() => {
        const hash = window.location.hash;
        const codeMatch = hash.match(/code=([^&]+)/);

        if (codeMatch) {
            handleCallback(codeMatch[1]);
        }
    },[])

    const login = async () => {
        const authService = new AuthService();
        console.log("button clicked")
        try {
            console.log("trying...")
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
        <AuthContext.Provider value={{ state: currentUser, login, logout }}>
            { children }
        </AuthContext.Provider>
    )   
}

export const useAuth = () => useContext(AuthContext);