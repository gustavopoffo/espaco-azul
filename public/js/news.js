function getNews() {
    fetch('/news')
        .then(response => response.json())
        .then(data => {
            if (data.news && Array.isArray(data.news)) {
                populateNews(data.news);
                console.log(data.news);
            } else {
                console.error('Invalid news data format');
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}


function populateNews(newsArray) {
    const newsContainer = document.getElementById('news-container');

    let rowDiv; // Variable to hold the current row div
    newsArray.forEach((news, index) => {
        // Create a new row div for every second news item
        if (index % 2 === 0) {
            rowDiv = document.createElement('div');
            rowDiv.className = 'row d-flex justify-content-evenly';
            newsContainer.appendChild(rowDiv);
        }

        // Create col div for each news item
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 mb-5';

        // Populate col div with news item content
        colDiv.innerHTML = `
            <div class="card">
                <img src="${news.img_url}" class="card-img-top" alt="${news.title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title fw-bold">${news.title}</h5>
                    <p class="card-text">${news.content}</p>
                    <a href="noticia?id=${news.id}" class="btn btn-primary mx-auto verMaisButton">Ver Mais...</a>
                </div>
            </div>
        `;

        // Append col div to current row div
        rowDiv.appendChild(colDiv);
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function updatePost(){
    fetch('/loggedin')
        .then(response => response.json())
        .then(data => {
            const newBtn = document.querySelector('.novopost');
            if (data.message == "Sim") {
                newBtn.removeAttribute("hidden");
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });

}
document.addEventListener('DOMContentLoaded', function() {
    updatePost();
    getNews();
});
