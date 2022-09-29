const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const btnTwitter = document.querySelector('#twitter');
const btnNewQuote = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
let apiQuotes = [];

function showSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

//show new code
function newQuote() {
	showSpinner();
	//pick a random code
	const index = Math.floor(Math.random() * apiQuotes.length);
	const quote = apiQuotes[index];
	quoteText.textContent = quote.text;
	authorText.textContent = quote.author ?? 'Unknown';

	if (quote.text.length > 50) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	removeSpinner();
}

//get quotes from api
async function getQuotes() {
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

	try {
		showSpinner();
		const response = await fetch(apiUrl);
		removeSpinner();
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		//catch error here
		alert(error);
		removeSpinner();
		getQuotes();
	}
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}&hashtags=${authorText.textContent}`;

	//open a new window
	window.open(twitterUrl, '_blank');
}

//event listeners
btnTwitter.addEventListener('click', tweetQuote);
btnNewQuote.addEventListener('click', (e) => newQuote());

//on load
getQuotes();
