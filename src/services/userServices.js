import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function getLoggedUserData() {
    const data = await axios.get(`${API_URL}/users/profile-data`, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function changePassword(formData) {
    const data = await axios.patch(`${API_URL}/users/change-password`, formData, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}

export async function uploadProfilePhoto(formData) {
    const data = await axios.put(`${API_URL}/users/upload-photo`, formData, {
        headers: {
            token: localStorage.getItem("userToken"),
        },
    });
    return data;
}
