export function mediaFactory(data) {
  // Destructuring the data object to extract its properties
  const { id, photographerId, title, image, video, likes } = data;

  // Defining a function that will return a DOM element for the media card
  function getMediaCardDOM() {
    // Create an article element to contain the media card
    const article = document.createElement("article");
    article.className += "media-card";
    article.id = id;

    // If the media is an image add the appropriate media card html to the article element
    if (image) {
      article.innerHTML = `
      <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
        <img class="media-card-img" src="assets/images/${photographerId}/${image}" alt="${title}">
      </button>
      <section class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo fa-heart fa-regular"></i>
          </button>
        </div>
      </section>
    `;
    }

    // If the media is a video add the appropriate media card html to the article element
    if (video) {
      article.innerHTML = `
      <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
        <video class="media-card-video" title="${title}">
          <source src="assets/images/${photographerId}/${video}" type="video/mp4">
        </video>
      </button>
      <section class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
          <i class="media-like-logo fa-heart fa-regular"></i>
          </button>
        </div>
      </section>
    `;
    }

    // Return the article element
    return article;
  }

  // Returning an object with the getMediaCardDOM function
  return { getMediaCardDOM };
}
