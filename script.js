const API_KEY = '2dd67da342577a207e6322bc4248e442'; // Replace with your GNews API key
const BASE_URL = 'https://gnews.io/api/v4';

async function fetchNews(query = '', topic = '') {
  const url = `${BASE_URL}/top-headlines?lang=en&country=us${
    query ? `&q=${query}` : ''
  }${topic ? `&topic=${topic}` : ''}&token=${API_KEY}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    displayNews(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML =
      '<p>Error fetching news. Please try again later.</p>';
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  if (articles.length === 0) {
    newsContainer.innerHTML =
      '<p>No news articles found. Try a different search term or category.</p>';
    return;
  }

  articles.forEach((article) => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';

    const publishDate = new Date(article.publishedAt).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );

    newsCard.innerHTML = `
        <img src="${
          article.image ||
          'https://codewithfaraz.com/tools/placeholder?size=300x200'
        }" alt="News Image">
        <div class="content">
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <p><strong>Published:</strong> ${publishDate}</p>
          <p><strong>Source:</strong> ${article.source.name || 'Unknown'}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      `;
    newsContainer.appendChild(newsCard);
  });
}

function handleSearch() {
  const searchInput = document.getElementById('search').value.trim();
  if (searchInput) {
    fetchNews(searchInput);
  } else {
    alert('Please enter a search term.');
  }
}

function filterNews(topic) {
  fetchNews('', topic);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchNews(); // Fetch default news on page load
});