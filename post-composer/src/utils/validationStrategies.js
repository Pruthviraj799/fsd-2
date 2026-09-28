const strategies = {
    twitter: (text) => {
        if (text.length > 280) {
            return "Twitter allows maximum 280 characters";
        }

        return "";
    },

    linkedin: (text) => {
        if (text.length > 3000) {
            return "LinkedIn allows maximum 3000 characters";
        }

        return "";
    },

    instagram: (text) => {
        if (text.length > 2200) {
            return "Instagram allows maximum 2200 characters";
        }

        return "";
    }
};

export default strategies;