import { API_URL } from "./constantsFrontend.js";
import { somethingWentWrong } from "./toastr.js";

export async function handleGetCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        return data.categories;
    } catch (error) {
        console.log("Something went wrong: ", error);
        somethingWentWrong();
    }
}
