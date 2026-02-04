import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// we mean this function will be sent formData to it
// using axios makes us can send the dataForm afterwards the API directly without the nead to add headers object
export async function signUpUser(formData) {
    const data = await axios.post(`${BASE_URL}/users/signup`, formData);
    return data;
}

export async function signInUser(formData) {
    const data = await axios.post(`${BASE_URL}/users/signin`, formData);
    return data;
}
