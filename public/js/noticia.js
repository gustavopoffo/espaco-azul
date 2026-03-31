document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch news details based on id from URL query parameter
    function fetchNewsById() {
        const urlParams = new URLSearchParams(window.location.search);
        const newsId = urlParams.get('id');

        if (!newsId) {
            console.error('No news id found in URL');
            return;
        }

        fetch(`/news/${newsId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.news) {
                    const news = data.news;

                    // Update HTML elements with fetched news data
                    document.getElementById('titulo').textContent = news.title;
                    document.getElementById('conteudo').textContent = news.content;

                    const img = document.getElementById('noticia-imagem');
                    img.src= news.img_url
                    img.alt = news.title;
                } else {
                    console.error('Invalid news data format');
                }
            })
            .catch(error => {
                console.error('Error fetching news details:', error);
            });
    }

    // Fetch news details when the DOM content is fully loaded
    fetchNewsById();
});
