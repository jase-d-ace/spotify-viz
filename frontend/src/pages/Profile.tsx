import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { state } = useAuth();
    console.log(state)

    return <div>Profile for {state.user?.display_name}</div>;
}