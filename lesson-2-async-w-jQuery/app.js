/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID cd1204408f2e8d1b7807a53cf5ce6406d7920bfec65e469b430a6782dcefd431',
            }
        }).done(addImage);

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e1563447a0ef42cfa445ad4cbcc8d05d`,
        }).done(addArticles);

    });


    function addImage(images){
            let htmlContent = '';
            const firstImage = images.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}"
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }

    function addArticles(articles) {
        let htmlContent = '';
        const data = articles;

        if(data && data.response && data.response.docs.length > 0){
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                    <a href="${article.web_url}"><figure>
                        <h2>${article.headline.main}</h2>
                        <p>${article.snippet}</p>
                        </figure>
                    </a>
                </li>`
            ).join('') + '</ul>';
        }else{
            htmlContent = `<div class="error-no-articles">No articles available</div>`;
        }
        responseContainer.insertAdjacentHTML('beforeend',htmlContent);
    }



})();
