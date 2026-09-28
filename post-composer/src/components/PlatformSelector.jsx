function PlatformSelector({ platform, setPlatform }) {

    return (
        <div className="form-group">

            <label>Select Platform</label>

            <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option value="twitter">
                    Twitter
                </option>

                <option value="linkedin">
                    LinkedIn
                </option>

                <option value="instagram">
                    Instagram
                </option>
            </select>

        </div>
    );
}

export default PlatformSelector;