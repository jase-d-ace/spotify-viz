import { useAuth } from "../contexts/AuthContext";
export default function Navbar() {
    const { state } = useAuth();
    return (
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                
            </ul>
            <div>
                {state.isAuthenticated ? `welcome, ${state.user?.display_name}` : "Not logged in"}
            </div>
        </nav>
    )
}