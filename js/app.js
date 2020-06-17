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
	open: 'is-open'
}

const domSelectors = {
	toggleMenuButton: document.querySelector('.js-toggle-menu'),
	headerNav: document.querySelector('.js-header-nav'),
}

const toggleMenu = (event) => {
	const button = event.target;
	button.classList.toggle(state.open);

	domSelectors.headerNav.classList.toggle(state.open);
}

// Event Listenres
domSelectors.toggleMenuButton.addEventListener('click', toggleMenu);