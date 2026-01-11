import { API_URL } from "./constantsFrontend.js";

export async function handleGetCategories() {
    const response = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return data.categories;
}
