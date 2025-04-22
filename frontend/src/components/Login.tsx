import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { state, login } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Login</h1>
            <button onClick={login}>Login with Spotify</button>
        </div>
    )
}