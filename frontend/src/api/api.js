import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;

const getBaseUrl = () => {
    if (envUrl && envUrl.trim() !== "") {
        const trimmed = envUrl.trim();
        if (trimmed.endsWith("/api")) {
            return trimmed;
        }
        return `${trimmed.replace(/\/$/, "")}/api`;
    }
    return import.meta.env.PROD ? "/api" : "http://localhost:8080/api";
};

export const API_BASE_URL = getBaseUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;