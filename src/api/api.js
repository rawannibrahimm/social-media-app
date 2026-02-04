import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
    console.error("VITE_BASE_URL is not defined in .env");
}

const api = axios.create({
    baseURL: BASE_URL, // all requests will use this as the prefix
    // You can add default headers here if needed
    // headers: { "Content-Type": "multipart/form-data" }
});

export default api;
