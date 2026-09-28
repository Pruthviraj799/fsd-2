import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    updatePost,
    deletePost
} from "../store/slices/postsSlice";

function PostList() {

    const dispatch = useDispatch();

    const posts = useSelector(
        (state) => state.posts.items
    );

    const [editingId, setEditingId] = useState(null);

    const [editContent, setEditContent] = useState("");


    const startEdit = (post) => {

        setEditingId(post.id);

        setEditContent(post.content);

    };


    const saveEdit = () => {

        dispatch(
            updatePost({
                id: editingId,
                content: editContent
            })
        );

        setEditingId(null);

        setEditContent("");

    };


    const handleDelete = (id) => {

        dispatch(
            deletePost(id)
        );

    };


    return (
        <div>

            <h2>Posts</h2>

            {posts.length === 0 ? (

                <p>No posts available.</p>

            ) : (

                posts.map((post) => (

                    <div
                        key={post.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            marginBottom: "10px"
                        }}
                    >

                        {editingId === post.id ? (

                            <>
                                <textarea
                                    value={editContent}
                                    onChange={(e) =>
                                        setEditContent(
                                            e.target.value
                                        )
                                    }
                                />

                                <br />

                                <button
                                    onClick={saveEdit}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingId(null)
                                    }
                                >
                                    Cancel
                                </button>
                            </>

                        ) : (

                            <>
                                <p>
                                    {post.content}
                                </p>

                                <button
                                    onClick={() =>
                                        startEdit(post)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(post.id)
                                    }
                                >
                                    Delete
                                </button>
                            </>

                        )}

                    </div>

                ))

            )}

        </div>
    );
}

export default PostList;