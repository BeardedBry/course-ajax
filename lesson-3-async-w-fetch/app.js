(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,{headers: {
            'Authorization': 'Client-ID cd1204408f2e8d1b7807a53cf5ce6406d7920bfec65e469b430a6782dcefd431',}
      }).
      then( response => response.json())
      .then(addImage)
      .catch(e => requestError(e,'image'));

      fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e1563447a0ef42cfa445ad4cbcc8d05d`)
      .then( response => response.json())
      .then(addArticle)
      .catch(e => requestError(e,'article'));

    });

    function addImage(dat){
        let htmlContent = '';
        const data = dat;

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

    function addArticle(data) {
        let htmlContent = `<ul>`;
        data.response.docs.forEach(article => {
            htmlContent += `<li class = 'article'>
            <a href="${article.web_url}"><figure>
                        <h2>${article.headline.main}</h2>
                        <p>${article.snippet}</p>
                        </figure>
                    </a></li>`
        })
        htmlContent += `</ul>`;
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();
