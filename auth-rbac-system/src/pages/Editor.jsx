import { useAuth } from "../context/AuthContext";

function Editor() {

    const { user } = useAuth();

    return (
        <div>

            <h1>Editor Panel</h1>

            <p>
                Welcome, {user?.username}
            </p>

            <p>
                Editors can create and edit content.
            </p>

            <button>
                Create Content
            </button>

            <button>
                Edit Content
            </button>

        </div>
    );
}

export default Editor;