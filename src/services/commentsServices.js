import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function getPostComments(postID) {
    const data = await axios.get(`${API_URL}/posts/${postID}/comments`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function createComment(comment) {
    const data = await axios.post(`${API_URL}/comments`, comment, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function deleteComment(comment_id) {
    const data = await axios.delete(`${API_URL}/comments/${comment_id}`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function updateComment(comment_id, content) {
    const data = await axios.put(`${API_URL}/comments/${comment_id}`, content, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}
