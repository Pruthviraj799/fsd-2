import { useEffect, useState } from "react";

import PlatformSelector from "./components/PlatformSelector";
import PostEditor from "./components/PostEditor";
import DraftList from "./components/DraftList";

import strategies from "./utils/validationStrategies";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {

    // Selected platform
    const [platform, setPlatform] = useState("twitter");

    // Post content
    const [content, setContent] = useState("");

    // Validation error
    const [error, setError] = useState("");

    // Drafts
    const [drafts, setDrafts] = useState(() => {

        const savedDrafts =
            localStorage.getItem("drafts");

        return savedDrafts
            ? JSON.parse(savedDrafts)
            : [];

    });


    // Save drafts to localStorage
    useEffect(() => {

        localStorage.setItem(
            "drafts",
            JSON.stringify(drafts)
        );

    }, [drafts]);


    // Real-time validation
    useEffect(() => {

        const validation =
            strategies[platform];

        const message =
            validation(content);

        setError(message);

    }, [content, platform]);


    // Save Draft
    const saveDraft = () => {

        if (!content.trim()) {

            toast.error(
                "Post cannot be empty"
            );

            return;
        }

        if (error) {

            toast.error(error);

            return;
        }

        const newDraft = {

            id: Date.now(),

            platform: platform,

            content: content

        };

        setDrafts([
            ...drafts,
            newDraft
        ]);

        setContent("");

        toast.success(
            "Draft saved successfully!"
        );
    };


    // Edit Draft
    const editDraft = (draft) => {

        setPlatform(
            draft.platform
        );

        setContent(
            draft.content
        );

        setDrafts(
            drafts.filter(
                (item) => item.id !== draft.id
            )
        );

        toast.info(
            "Draft loaded for editing"
        );
    };


    // Delete Draft
    const deleteDraft = (id) => {

        setDrafts(
            drafts.filter(
                (draft) => draft.id !== id
            )
        );

        toast.success(
            "Draft deleted"
        );
    };


    // Clear post
    const clearPost = () => {

        setContent("");

        setError("");

    };


    return (

        <div className="container">

            <h1>
                Social Media Post Composer
            </h1>

            <PlatformSelector
                platform={platform}
                setPlatform={setPlatform}
            />

            <PostEditor
                content={content}
                setContent={setContent}
                platform={platform}
                error={error}
            />

            <div className="buttons">

                <button
                    onClick={saveDraft}
                    disabled={!!error}
                >
                    Save Draft
                </button>

                <button
                    onClick={clearPost}
                >
                    Clear
                </button>

            </div>

            <DraftList
                drafts={drafts}
                editDraft={editDraft}
                deleteDraft={deleteDraft}
            />

            <ToastContainer />

        </div>

    );
}

export default App;