import { getPhotographers } from "./dataImport.js";

// Retrieve a photographer's media items from the JSON data by their id
export async function getPhotographerMedia() {
    // Fetch the media array from the JSON data
    const { media } = await getPhotographers();
    // Retrieve the photographer's id from the URL parameters
    const params = new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    // Filter the media array to return only items with a matching photographerId
    return media.filter(
        (mediaItem) => mediaItem.photographerId === photographerId
    );
}
