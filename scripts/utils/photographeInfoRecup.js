import { getPhotographers } from "./dataImport.js";

// call data and retrieve id for obtain photographe informations
export async function photographerInfo() {
    const { photographers } = await getPhotographers();
    const params = new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    return photographers.find(
        (photographer) => photographer.id === photographerId
    );
}
