// Extract some properties from the object data
export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        article.className += "photographer-card";

        // Create differents elements for the index page
        const photographerLink = document.createElement("a");
        photographerLink.className += "photographer-link";
        photographerLink.setAttribute("href", `photographer.html?id=${id}`);
        photographerLink.setAttribute(
            "aria-label",
            `Lien vers le portfolio de ${name}`
        );

        const photographerImg = document.createElement("img");
        photographerImg.className += "photographer-img";
        photographerImg.setAttribute("src", picture);
        photographerImg.setAttribute("alt", `Photo de ${name}`);

        const photographerName = document.createElement("h2");
        photographerName.className += "photographer-name";
        photographerName.textContent = name;

        const photographerZone = document.createElement("p");
        photographerZone.className += "photographer-zone";
        photographerZone.textContent = `${city}, ${country}`;

        const photographerTagline = document.createElement("p");
        photographerTagline.className += "photographer-tagline";
        photographerTagline.textContent = tagline;

        const photographerPrice = document.createElement("p");
        photographerPrice.className += "photographer-price";
        photographerPrice.textContent = `${price} € / jour`;

        photographerLink.appendChild(photographerImg);
        photographerLink.appendChild(photographerName);

        // article children element
        article.appendChild(photographerLink);
        article.appendChild(photographerZone);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);

        // Return the article element
        return article;
    }

    // Return this function
    return { name, picture, getUserCardDOM };
}
