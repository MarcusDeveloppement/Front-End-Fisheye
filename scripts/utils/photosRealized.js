import { getPhotographers } from "./dataImport.js";

// Retrieve a photographer's media items from the JSON data by their id
export async function getPhotographerMedia() {
    const { media } = await getPhotographers();
    const params = new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    return media.filter(
        (mediaItem) => mediaItem.photographerId === photographerId
    );
}
