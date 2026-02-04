import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
// &sort=-createdAt
export async function getAllPosts() {
    const data = await axios.get(`${API_URL}/posts?limit=50&sort=-createdAt`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function getPostDetails(postID) {
    const data = await axios.get(`${API_URL}/posts/${postID}`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function createPost(formData) {
    const data = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
            token: localStorage.getItem("userToken"),
            //  we don't need to specify it while using axios as it already detects the type itself
            //  as sending the formData directly into the body as axios knows
            // "Content-Type": "multipart/form-data"
        },
    });
    return data;
}

export async function getUserPosts(userId) {
    const data = await axios.get(`${API_URL}/users/${userId}/posts?limit=50`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function updatePost(formData, postID) {
    const data = await axios.put(`${API_URL}/posts/${postID}`, formData, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function deletePost(postID) {
    const data = await axios.delete(`${API_URL}/posts/${postID}`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}
