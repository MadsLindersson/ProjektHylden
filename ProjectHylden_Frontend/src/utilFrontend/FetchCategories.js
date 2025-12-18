export async function handleGetCategories ()   {
    const response = await fetch("http://localhost:8080/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    
    return data.categories;
}