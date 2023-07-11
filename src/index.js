document.addEventListener('DOMContentLoaded', loadFirstBeer);

const beerName = document.querySelector('.beer-details h2');
const beerImage = document.querySelector('.beer-details img');
const beerDescription = document.querySelector('.beer-details p');
const beersList = document.querySelector('#beer-list');
const beerReviews = document.getElementById('review-list');
const reviewsForm = document.getElementById('review-form');
// const BEERS_URL = 'https://api.npoint.io/e87daf8b5ac4bf34f345/beers';
const BEERS_URL = 'http://localhost:3000/beers';

let aBeer;
let beers;

function loadFirstBeer() {
	fetch(BEERS_URL)
		.then((res) => res.json())
		.then((data) => {
			aBeer = data[0];
			beers = data;
			loadAllBeers(beers);
			renderBeer(aBeer);
		});
}

function renderBeer(singleBeer) {
	beerReviews.innerHTML = '';
	const { name, image_url, description, reviews } = singleBeer;

	reviews.map((review) => {
		const beerReview = document.createElement('li');
		beerReview.textContent = review;
		beerReviews.appendChild(beerReview);

		beerReview.addEventListener('click', () => {
			beerReviews.removeChild(beerReview);
		});
	});

	beerName.textContent = name;
	beerImage.src = image_url;
	beerDescription.textContent = description;
}

function loadAllBeers(beers) {
	beers.map((beer) => {
		const singleBeer = document.createElement('li');

		singleBeer.textContent = beer.name;
		beersList.appendChild(singleBeer);

		singleBeer.addEventListener('click', () => {
			aBeer = beer;
			console.log(aBeer);
			renderBeer(aBeer);
		});
	});
}

const reviewInput = reviewsForm.children[1];

reviewsForm.addEventListener('submit', addBeerReview);

function addBeerReview(e) {
	e.preventDefault();

	const { reviews } = aBeer;
	const updatedReviews = reviews.push(reviewInput.value);

	fetch(`${BEERS_URL}/${aBeer.id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedReviews),
	});

	console.log(reviews);
	console.log(reviewInput.value);
	renderBeer(aBeer);
}