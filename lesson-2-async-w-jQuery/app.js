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

        $.ajax()

    });


    function addImage(){
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if(data && data.results && data.results[0])
        {
            const firstImage = data.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}"
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        }else{
            htmlContent = `<div class="error-no-image">No images available</div>`;
        }

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }

    function addArticles() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

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
