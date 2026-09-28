import { useAuth } from "../context/AuthContext";

function Admin() {

    const { user } = useAuth();

    return (
        <div>

            <h1>Admin Panel</h1>

            <p>
                Welcome, {user?.username}
            </p>

            <p>
                Only administrators can access this page.
            </p>

            <button>
                Create User
            </button>

            <button>
                Delete User
            </button>

        </div>
    );
}

export default Admin;