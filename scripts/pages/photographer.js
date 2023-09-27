// imports modules as needed
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

function addEventListenersForm() {
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
    // Prevent the default for submission
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
    const modalForm = document.getElementById("modalForm");
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
    const dropdown = document.createElement("select");
    dropdown.classList.add("dropdown");
    dropdown.id = "dropdownMenu";
    dropdown.setAttribute("aria-label", "Menu de tri");

    // Create options for the dropdown
    const options = [
        { value: "", text: "Trier par" },
        { value: "Popularité", text: "Popularité" },
        { value: "Date", text: "Date" },
        { value: "Titre", text: "Titre" },
    ];
    //Foreach loop that goes through each dropdown option
    options.forEach((option) => {
        const optionElem = document.createElement("option");
        optionElem.classList.add("dropdown-options");
        optionElem.value = option.value;
        optionElem.textContent = option.text;
        dropdown.appendChild(optionElem);
    });

    // Add the dropdown to the main element
    const mainElement = document.querySelector("main");
    mainElement.appendChild(dropdown);
}

async function sortMediaSection() {
    // Retrieve the selected option value
    const dropdownMenu = document.getElementById("dropdownMenu");
    const selectedOption = dropdownMenu.value;
    // Sort the photographerMedia array based on the selected option
    if (selectedOption === "Popularité") {
        photographerMedia.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === "Date") {
        photographerMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedOption === "Titre") {
        photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Remove the existing media section
    const mediaSection = document.querySelector(".media-section");
    if (mediaSection) {
        mediaSection.remove();
    }

    // Display the sorted media
    renderMediaSection(photographerMedia);

    // Reinitialize the carousel
    carousselles();

    // ********** Update the total likes reused the footer logic ***************
    const mediaLikeCounts = document.querySelectorAll(".media-like-count");
    let totalMediaLikeCount = 0;
    mediaLikeCounts.forEach((media) => {
        totalMediaLikeCount += Number(media.textContent);
    });

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
    // put the orverla back for the dropdown menu
    overlayPic();
}

// ***********************************************************SECTION MEDIA REALISATION*********************************************************

function renderMediaSection(array) {
    // create and select
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
    // initiasation index used for images or video
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
            video.addEventListener("canplay", function () {
                video.play();
            });
            modalMedia.appendChild(video);
        }

        modal.style.display = "block";
        // update the index
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
// Overlay function for the carousel
function overlayPic() {
    const afficheElements = document.querySelectorAll(".affiche");
    const overlay = document.getElementById("overlay-pic");
    const modalClose = document.getElementById("closeImageModal");

    afficheElements.forEach(function (affiche) {
        affiche.addEventListener("click", function () {
            overlay.style.display = "block";
        });
    });

    modalClose.addEventListener("click", function () {
        overlay.style.display = "none";
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            overlay.style.display = "none";
        }
    });
}

// create a function to call and render the result
async function renderPhotographPage() {
    await PhotographHeader(getPhotographerInfo);
    await renderDropdown();
    await insertPhotographName(getPhotographerInfo);
    await renderMediaSection(photographerMedia);
    await overlayPic();
    await addEventListenersForm();
    await overlay();
    await renderPhotographFooter(getPhotographerInfo);
    await carousselles();
}

renderPhotographPage();
