const API_KEY = "pub_d13b24a493724b3b9b131d2d12db3bca";
const BASE_URL = "https://newsdata.io/api/1/news";

async function loadNews(category = "top") {
  const newsContainer = document.getElementById("newsContainer");
  const loader = document.getElementById("loader");

  newsContainer.innerHTML = "";
  loader.style.display = "block";

  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&country=in&language=en&category=${category}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      newsContainer.innerHTML = "<p>No news found in this category.</p>";
    } else {
      data.results.forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <img src="${article.image_url || 'https://via.placeholder.com/400x200'}" alt="news"/>
          <div class="content">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.link}" target="_blank">Read More</a>
          </div>
        `;
        newsContainer.appendChild(card);
      });
    }
  } catch (error) {
    newsContainer.innerHTML = `<p style="color: red;">Failed to load news: ${error.message}</p>`;
  } finally {
    loader.style.display = "none";
  }
}

loadNews(); 
