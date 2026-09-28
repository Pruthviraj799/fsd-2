function PostEditor({
    content,
    setContent,
    platform,
    error
}) {

    const limits = {
        twitter: 280,
        linkedin: 3000,
        instagram: 2200
    };

    return (
        <div className="editor">

            <label>Write your post</label>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
            />

            <div className="character-count">
                Characters: {content.length} / {limits[platform]}
            </div>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default PostEditor;