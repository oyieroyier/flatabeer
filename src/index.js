document.addEventListener('DOMContentLoaded', loadFirstBeer);

const beerName = document.querySelector('.beer-details h2');
const beerImage = document.querySelector('.beer-details img');
const beerDescription = document.querySelector('.beer-details p');
const beersList = document.querySelector('#beer-list');
const BEERS_URL = 'https://api.npoint.io/e87daf8b5ac4bf34f345/beers';

let beers;
let singleBeer;

function loadFirstBeer() {
	fetch(BEERS_URL)
		.then((res) => res.json())
		.then((data) => {
			beers = data;
			loadAllBeers(beers);
			renderBeer(beers[0]);
		});
}

function renderBeer(singleBeer) {
	const { name, image_url, description } = singleBeer;

	beerName.textContent = name;
	beerImage.src = image_url;
	beerDescription.textContent = description;
}

function loadAllBeers(beers) {
	beers.map((beer) => {
		const singleBeer = document.createElement('li');

		singleBeer.textContent = beer.name;
		beersList.appendChild(singleBeer);
	});
}
