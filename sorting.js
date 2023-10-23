let year = 2007;
let quarter = 1;
let reference = document.getElementById('reference');
let sorting = document.getElementById('sorting');

function increaseQuarter() {
    quarter += 1;
    if (quarter > 4) {
        year += 1;
        quarter -= 4;
    }
    fetchImages(reference);
}
function decreaseQuarter() {
    quarter -= 1;
    if (quarter < 1) {
        year -= 1;
        quarter += 4
    }
    fetchImages(reference);
}
function increaseYear() {
    year += 1;
    fetchImages(reference);
}
function decreaseYear() {
    year -= 1;
    fetchImages(reference);
}

function createImg(image) {
    var node = document.createElement('img');
    node.src = image
    return node
}
function redraw(box, images) {
    box.replaceChildren([]);
    images.forEach((i) => box.appendChild(createImg(i)));
}

function fetchImages(box) {
    if (box.id == 'reference') {
        url = `http://localhost:8080/?year=${year}&deep=true&count=100`;
    } else if (box.id == 'sorting') {
        url = `http://localhost:8080/?year=SORT&deep=false&count=300`;
    }
    fetch(url)
        .then(function(response){return response.json();})
        .then(function(json){redraw(box, json.result);})
}

fetchImages(reference);
fetchImages(sorting);