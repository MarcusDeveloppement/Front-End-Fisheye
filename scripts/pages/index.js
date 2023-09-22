import { getPhotographers } from "../utils/dataImport.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );
    //Browse the table photographers and take the elements
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
//Data display initialization
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
init();
