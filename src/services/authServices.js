import axios from "axios";
import api from "../api/api";
// we mean this function will be sent formData to it
// using axios makes us can send the dataForm afterwards the API directly without the nead to add headers object
export async function signUpUser(formData) {
    const data = await api.post("/users/signup", formData);
    return data;
}

export async function signInUser(formData) {
    const data = await api.post("/users/signin", formData);
    return data;
}
