import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null
};

const postsSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {

        addPost: (state, action) => {
            state.items.push(action.payload);
        },

        updatePost: (state, action) => {

            const index = state.items.findIndex(
                post => post.id === action.payload.id
            );

            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },

        deletePost: (state, action) => {

            state.items = state.items.filter(
                post => post.id !== action.payload
            );
        }

    }
});

export const {
    addPost,
    updatePost,
    deletePost
} = postsSlice.actions;

export default postsSlice.reducer;