import { photographerInfo } from "../utils/photographeInfoRecup.js";
const getPhotographerInfo = await photographerInfo();

// create funtion for information header
function PhotographHeader(data) {
  const { name, city, country, tagline, portrait } = data;

  const photographHeader = `
    <section class="photograph-header">
      <div class="photograph-info">
        <h1 class="photograph-name">${name}</h1>
        <p class="photograph-zone">${city}, ${country}</p>
        <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="contact_button" id="contactBtn" aria-label="Bouton d'ouverture du formulaire de contact">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
    </section>
  `;

  // select element where i display the information
  const mainElem = document.querySelector("main");
  mainElem.innerHTML += photographHeader;
}

// create a function to call and render the result
async function renderPhotographPage() {
  await PhotographHeader(getPhotographerInfo);
}

renderPhotographPage();
