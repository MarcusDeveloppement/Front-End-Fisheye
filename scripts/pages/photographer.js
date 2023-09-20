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
    closeModal("contact_modal");
  }
}

// setting up the overlay
function overlay() {
  const btnContact = document.getElementById("contactBtn");
  const overlay = document.getElementById("overlay");
  const modalClose = document.getElementById("modalCloseBtn");
  const submitBtn = document.getElementById("submitButton");
  btnContact.addEventListener("click", function () {
    overlay.style.display = "block";
  });

  modalClose.addEventListener("click", function () {
    overlay.style.display = "none";
  });

  submitBtn.addEventListener("click", function () {
    if (modalForm.checkValidity() === true) {
      overlay.style.display = "none";
    }
  });
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

// ******************************************************************* THE FOOTER *************************************************************

function renderPhotographFooter(obj) {
  const { price } = obj;

  const mediaLikeCounts = document.querySelectorAll(".media-like-count");

  let totalMediaLikeCount = 0;
  mediaLikeCounts.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });

  const photographFooter = `
    <aside class="footer">
      <div class="footer-container">
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-heart fas"></i>
      </div>
      <p>${price}€ / jour</p>
    </aside>
  `;

  const footer = document.createElement("footer");
  footer.innerHTML = photographFooter;

  const body = document.body;
  body.appendChild(footer);

  // Incrementation of the total Likes
  const articleSection = document.querySelector(".media-section");
  const priceElements = articleSection.querySelectorAll(".media-like-logo");

  // browse the priceElements
  priceElements.forEach((priceElement) => {
    priceElement.addEventListener("click", () => {
      //conditions for increment the total
      if (priceElement.classList.contains("far")) {
        totalMediaLikeCount++;
      } else {
        totalMediaLikeCount--;
      }
      // set up the results
      document.getElementById("totalLikesCount").textContent =
        totalMediaLikeCount;
    });
  });
}

// *********************************************** Carousselles ************************************************
function carousselles() {
  const galleryItems = document.querySelectorAll(".affiche");
  const modal = document.getElementById("imageModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMedia = document.getElementById("modalMedia");
  const closeBtn = document.getElementById("closeImageModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentImageIndex = 0;

  function openModal(index) {
    const item = galleryItems[index];
    const mediaType = item.getAttribute("data-media-type");
    const mediaSrc = item.getAttribute("data-src");
    const title = item.getAttribute("alt");

    modalTitle.textContent = title;
    modalMedia.innerHTML = "";

    // condition for if is an image or video

    if (mediaType === "image") {
      const img = document.createElement("img");
      img.src = mediaSrc;
      img.alt = title;
      img.classList.add("media");
      modalMedia.appendChild(img);
    } else if (mediaType === "video") {
      const video = document.createElement("video");
      video.src = mediaSrc;
      video.controls = true;
      video.classList.add("media");
      modalMedia.appendChild(video);
      video.play();
    }

    modal.style.display = "block";
    currentImageIndex = index;
  }

  // function close modale image and video
  function closeModal() {
    modal.style.display = "none";
  }

  // function for view the preview or the next images/videos
  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    openModal(currentImageIndex);
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    openModal(currentImageIndex);
  }

  // open the modal pic
  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openModal(index);
    });
  });

  // close the modal with the cross or escape  and move with the arrows left and right
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowLeft") {
      showPrevImage();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    }
  });

  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);
}

// create a function to call and render the result
async function renderPhotographPage() {
  await PhotographHeader(getPhotographerInfo);
  await insertPhotographName(getPhotographerInfo);
  await renderDropdown();
  await renderMediaSection(photographerMedia);
  addEventListeners();
  overlay();
  await renderPhotographFooter(getPhotographerInfo);
  carousselles();
}

renderPhotographPage();
