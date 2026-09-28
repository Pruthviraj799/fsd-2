import { useState } from "react";
import { useDispatch } from "react-redux";

import { addPost } from "../store/slices/postsSlice";

function PostManager() {

    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const handleAddPost = () => {

        if (!content.trim()) {
            return;
        }

        const newPost = {
            id: Date.now(),
            content: content
        };

        dispatch(addPost(newPost));

        setContent("");
    };

    return (
        <div>

            <h2>Add New Post</h2>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
            />

            <br />

            <button onClick={handleAddPost}>
                Add Post
            </button>

        </div>
    );
}

export default PostManager;