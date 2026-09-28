import { useState } from "react";

import {
    refreshAccessToken
} from "../utils/auth";

import { useAuth } from "../context/AuthContext";

import api from "../services/api";

import RoleGuard from "../components/RoleGuard";


function Dashboard() {

    const { user, logout } = useAuth();

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const fetchPosts = async () => {

        setLoading(true);

        setError("");

        try {

            const response =
                await api.get("/posts?_limit=5");

            setPosts(response.data);

        } catch (error) {

            console.error(error);

            setError(
                "Failed to fetch posts"
            );

        } finally {

            setLoading(false);

        }
    };


    const handleRefreshToken = () => {

        const newToken =
            refreshAccessToken();

        if (newToken) {

            alert(
                "Access token refreshed successfully!"
            );

        } else {

            alert(
                "Refresh failed. Please login again."
            );

        }
    };


    return (

        <div>

            <h1>Dashboard</h1>

            <h2>
                Welcome, {user?.username}
            </h2>

            <p>
                Role:
                <strong> {user?.role}</strong>
            </p>


            {/* Fetch Posts */}

            <button onClick={fetchPosts}>
                Fetch Posts
            </button>


            {/* Logout */}

            <button onClick={logout}>
                Logout
            </button>


            {/* Refresh Token */}

            <button onClick={handleRefreshToken}>
                Refresh Token
            </button>


            {/* Create Permission */}

            <RoleGuard permission="create">

                <button>
                    Create Post
                </button>

            </RoleGuard>


            {/* Edit Permission */}

            <RoleGuard permission="edit">

                <button>
                    Edit Post
                </button>

            </RoleGuard>


            {/* Delete Permission */}

            <RoleGuard permission="delete">

                <button>
                    Delete Post
                </button>

            </RoleGuard>


            {/* Loading */}

            {loading && (

                <p>
                    Loading...
                </p>

            )}


            {/* Error */}

            {error && (

                <p>
                    {error}
                </p>

            )}


            {/* Posts */}

            {posts.length > 0 && (

                <div>

                    <h2>
                        Posts
                    </h2>


                    {posts.map((post) => (

                        <div key={post.id}>

                            <h3>
                                {post.title}
                            </h3>

                            <p>
                                {post.body}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default Dashboard;
