import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { state } = useAuth();
    return <div>Profile</div>;
}