const rssFeedUrl = "https://5tidesfl.com/feed/";

async function fetchRSS() {
    try {
        const response = await fetch(rssFeedUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        const items = xml.querySelectorAll("item");
        const blogContainer = document.getElementById("blog-container");

        items.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("description").textContent;

            const blogPost = document.createElement("div");
            blogPost.innerHTML = `
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <p>${description}</p>
            `;
            blogContainer.appendChild(blogPost);
        });
    } catch (error) {
        console.error("Failed to fetch RSS feed:", error);
    }
}

fetchRSS();
