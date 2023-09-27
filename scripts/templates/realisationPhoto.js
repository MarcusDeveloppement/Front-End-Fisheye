export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, thumbnail } = data;

    // Defining a function that will return a DOM element for the media card
    function getMediaCardDOM() {
        // Create an article element to contain the media card
        const article = document.createElement("article");
        article.className += "media-card";
        article.id = id;

        // If the media is an image add the appropriate media card HTML to the article element
        if (image) {
            article.innerHTML = `
      <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
        <img class="media-card-img affiche" src="assets/images/${photographerId}/${image}" data-src="assets/images/${photographerId}/${image}" data-media-type="image" alt="${title}">
      </button>
      <section class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo far fa-heart" id="heart"></i>
          </button>
        </div>
      </section>
    `;
        }

        // If the media is a video add the appropriate media card HTML to the article element
        if (video) {
            article.innerHTML = `
      <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
      <img class="media-card-video affiche  hide-video" src="assets/images/${photographerId}/${thumbnail}" data-src="assets/images/${photographerId}/${video}" data-media-type="video" alt="${title}">
    </button>
    <section class="media-card-info">
    <h2 class="media-card-title">${title}</h2>
    <div class="media-like-container">
        <span class="media-like-count">${likes}</span>
        <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo far fa-heart" id="heart"></i>
        </button>
    </div>
    </section>

  
    `;
        }
        // return heart like and increase the result
        const likeButton = article.querySelector(".media-like-button");
        const heartIcon = article.querySelector(".media-like-logo");
        const likeCount = article.querySelector(".media-like-count");

        let isLiked = false;
        let likesCountValue = likes;

        likeButton.addEventListener("click", function () {
            if (isLiked) {
                likesCountValue--;
                likeCount.textContent = likesCountValue;
                heartIcon.classList.remove("fas");
                heartIcon.classList.add("far");
            } else {
                likesCountValue++;
                likeCount.textContent = likesCountValue;
                heartIcon.classList.remove("far");
                heartIcon.classList.add("fas");
            }
            isLiked = !isLiked;
        });

        // back article elem
        return article;
    }

    return { getMediaCardDOM };
}
