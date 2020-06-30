// Defining global veriables
const bp = {
	mobile: 320,
	tablet: 768,
	desktop: 1024,
	largeDesctop: 1440
}

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const state = {
	active: 'is-active',
	desabled: 'is-disabled',
	valid: 'is-valid',
	invalid: 'is-invalid',
	open: 'is-open',
	hidden: 'is-hidden'
}

const domSelectors = {
	toggleMenuButton: document.querySelector('.js-toggle-menu'),
	headerNav: document.querySelector('.js-header-nav'),
	popup: document.querySelector('.js-popup'),
	popuplink: document.querySelectorAll('.js-popup-link'),
	popupClose: document.querySelectorAll('.js-popup-close'),
}

const toggleMenu = (event) => {
	const button = event.target;
	button.classList.toggle(state.open);

	domSelectors.headerNav.classList.toggle(state.open);
}

const togglePopup = (currentPopup) => {
	currentPopup.classList.toggle(state.hidden);
	currentPopup.classList.toggle(state.open);

	domSelectors.popup.classList.toggle(state.hidden);
}

const handlePopup = (event) => {
	const currentLink = event.target;
	let currentVal;

	if (!currentLink.getAttribute('data-project')) {
		currentVal = currentLink.closest('.js-popup-item').id;
	} else {
		currentVal = currentLink.dataset.project;
	}

	const currentPopup = document.querySelector(`#${currentVal}`);
	togglePopup(currentPopup);
}

// Event Listenres
domSelectors.toggleMenuButton.addEventListener('click', toggleMenu);
domSelectors.popuplink.forEach(function(item) {
	item.addEventListener('click', (e) => {
		handlePopup(e);
	});
});

domSelectors.popupClose.forEach(function(item) {
	item.addEventListener('click', (e) => {
		handlePopup(e);
	});
});