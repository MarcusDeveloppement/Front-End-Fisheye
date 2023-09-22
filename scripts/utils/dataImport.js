export async function getPhotographers() {
    const jsonPath = "data/photographers.json";
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data;
}
