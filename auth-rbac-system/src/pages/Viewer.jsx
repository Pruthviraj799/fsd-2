import { useAuth } from "../context/AuthContext";

function Viewer() {

    const { user } = useAuth();

    return (
        <div>

            <h1>Viewer Panel</h1>

            <p>
                Welcome, {user?.username}
            </p>

            <p>
                Viewers have read-only access.
            </p>

        </div>
    );
}

export default Viewer;