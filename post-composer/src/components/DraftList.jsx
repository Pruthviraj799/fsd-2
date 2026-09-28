function DraftList({
    drafts,
    editDraft,
    deleteDraft
}) {

    return (
        <div className="draft-section">

            <h2>Saved Drafts</h2>

            {drafts.length === 0 ? (
                <p>No drafts saved.</p>
            ) : (

                drafts.map((draft) => (

                    <div className="draft" key={draft.id}>

                        <p>
                            {draft.content}
                        </p>

                        <small>
                            Platform: {draft.platform}
                        </small>

                        <div>

                            <button
                                onClick={() => editDraft(draft)}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteDraft(draft.id)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default DraftList;