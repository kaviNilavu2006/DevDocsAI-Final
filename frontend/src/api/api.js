import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = envUrl
    ? (envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`)
    : "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;