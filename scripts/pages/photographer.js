import { photographerInfo } from "../utils/photographeInfoRecup.js";
import { closeModal } from "../utils/contactForm.js";
import { mediaFactory } from "../templates/realisationPhoto.js";
import { getPhotographerMedia } from "../utils/photosRealized.js";
const getPhotographerInfo = await photographerInfo();
const photographerMedia = await getPhotographerMedia();

// create function for information header
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
// *********************************************************************** The FORM ************************************************************************
// insert photograph name in the contact form
function insertPhotographName(object) {
  const { name } = object;
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;
}

function addEventListeners() {
  const contactBtn = document.querySelector(".contact_button");
  contactBtn.addEventListener("click", function () {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  });

  const closeBtn = document.getElementById("modalCloseBtn");
  closeBtn.addEventListener("click", function () {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  });

  const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", validateModalForm);

  // An listener for the menu dropping
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.addEventListener("change", sortMediaSection);
}

function validateModalForm(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the elements of the form
  const modalForm = document.getElementById("modalForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Check if the form input data is valid & console.log the data as an object
  if (modalForm.checkValidity()) {
    console.log({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    });
    // modalForm.reset();
    closeModal("contact_modal");
  }
}
// *****************************************************************THE DROPDOWN ***********************************************************
function renderDropdown() {
  // Create the dropdown menu
  const dropdownHtml = `
    <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
      <option class="dropdown-options" value=""> Trier par </option>
      <option class="dropdown-options" value="Popularité">Popularité</option>
      <option class="dropdown-options" value="Date">Date</option>
      <option class="dropdown-options" value="Titre">Titre</option>
    </select>
  `;

  // Add the dropdown HTML to the main element
  const mainElement = document.querySelector("main");
  mainElement.innerHTML += dropdownHtml;
}

async function sortMediaSection() {
  // Retrieve the selected option value
  const selectedOption = this.value;

  // Sort the photographerMedia array using the likes key if the selected option is "Popularité"
  if (selectedOption == "Popularité") {
    await photographerMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Sort the photographerMedia array using the date key if the selected option is "Date"
  if (selectedOption == "Date") {
    await photographerMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Sort the photographerMedia array using the title key if the selected option is "Titre"
  if (selectedOption == "Titre") {
    await photographerMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  // Remove the existing media section
  const mediaSection = document.querySelector(".media-section");
  mediaSection.remove();

  // display the articles
  renderMediaSection(photographerMedia);
}

// ***********************************************************SECTION MEDIA REALISATION*********************************************************

function renderMediaSection(array) {
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";
  const mainEl = document.querySelector("main");
  mainEl.append(mediaSection);

  // parsing the array
  array.forEach((media) => {
    const mediaCardModel = mediaFactory(media);
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    mediaSection.append(mediaCardDOM);
  });
}

// create a function to call and render the result
async function renderPhotographPage() {
  await PhotographHeader(getPhotographerInfo);
  await insertPhotographName(getPhotographerInfo);
  await renderDropdown();
  await renderMediaSection(photographerMedia);
  addEventListeners();
}

renderPhotographPage();
