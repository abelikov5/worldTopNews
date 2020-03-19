const apiKey = '4957db656ce149f1b26d85a757fa7294';

/*get NEWS via API request on newsapi.org */
function preLoadFunction (country = 'us') {
    const xhr = new XMLHttpRequest();
    const apiUrl = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    xhr.open('GET', apiUrl);
    xhr.send();
    xhr.addEventListener('load', () => {
        const respons = JSON.parse(xhr.responseText);
        parseNews(respons.articles);
    })
};

preLoadFunction('us');

function parseNews(articl) {
    let fragment = '<div class="row">'
    for (let i = 0; i < articl.length; i++) 
        fragment += templateNews(articl[i]);
    fragment += "</div>"
    addNewsToHtml(fragment); 
}

function templateNews({title, description, urlToImage, url}) {
    return `
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="img_wrap">
                    <img src="${urlToImage}" alt="" class="img_news_container">
                </div>    
                <div class="title_news">${title}</div>
                ${description}
                <a href="${url}">Read more</a>
            </div>
            `
}

/* add news to HTML insertAdjacentHTML */
function addNewsToHtml(fragment) {
    let pushFragment = document.getElementById('news_container');
    console.log(pushFragment);
    pushFragment.insertAdjacentHTML('afterbegin', fragment);
}

// document.getElementById('select_country').addEventListener('change', function () {
//     document.getElementById('news_container').innerText = '';
//     preLoadFunction(this.value);
// });

let flags = document.querySelector('.flags');
flags.addEventListener("click", (e) => {
    let country = e.target.getAttribute('data-flag');
    if (country)  
    {
        document.getElementById('news_container').innerText = '';
        preLoadFunction(country);
    }       
});

let sandv = document.getElementById('send_bar');
sandv.addEventListener("click", (e) => {
    let country = e.target.getAttribute('data-country');
    if (country)  
    {
        document.getElementById('news_container').innerText = '';
        preLoadFunction(country);
        sandv.classList.toggle('display_none');
    }       
});

document.querySelector(".right").addEventListener('click', () => {
    // console.log('click');
    // let sandvich = document.getElementById('send_bar');
    // console.log(sandvich);
    sandv.classList.toggle('display_none');
})