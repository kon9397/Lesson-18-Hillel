const movies = [];
const $moviesList = document.querySelector('.movies');

function getRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const results = JSON.parse(xhr.responseText);
        results.results.forEach((film, index) => {
            const $movieListItem = document.createElement('li');
            $movieListItem.classList.add('movie-item');
            $movieListItem.textContent = film.title;
            $movieListItem.setAttribute('id', index);
            $moviesList.appendChild($movieListItem);
            movies.push(film);
        });
    };
}

getRequest('https://swapi.co/api/films/');

$moviesList.addEventListener('click', e => {
    if(e.target.classList.contains('movie-item')) {
        if(!(e.target.classList.contains('active'))) {
            const id = e.target.getAttribute('id');
            const $sublist = document.createElement('li');
            const $planetsList = document.createElement('ul');
            movies[id].planets.forEach(movie => {
                const xhr = new XMLHttpRequest();
                xhr.open('get', movie);
                xhr.send();
                xhr.onload = function() {
                    const planet = JSON.parse(xhr.responseText);
                    const $planetListItem = document.createElement('li');
                    $planetListItem.textContent = planet.name;
                    $planetsList.appendChild($planetListItem);
                };
            });
            $sublist.append($planetsList);

            e.target.insertBefore($sublist, e.target.parentElement.nextElement);
            e.target.classList.add('active');
        }
    }
});
