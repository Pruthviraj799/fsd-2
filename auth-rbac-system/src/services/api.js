import axios from "axios";

import {
    getToken,
    refreshAccessToken,
    removeToken,
    removeRefreshToken
} from "../utils/auth";


const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {

        const token = getToken();

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;


        // Check for 401 Unauthorized
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;


            const newToken =
                refreshAccessToken();


            if (newToken) {

                originalRequest.headers.Authorization =
                    `Bearer ${newToken}`;

                return api(originalRequest);
            }


            // Refresh failed
            removeToken();

            removeRefreshToken();

            window.location.href = "/login";
        }


        return Promise.reject(error);
    }
);


export default api;