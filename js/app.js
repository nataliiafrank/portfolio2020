import {projects} from './data';

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
	hidden: 'is-hidden',
	closed: 'is-closed',
}

const domSelectors = {
	toggleMenuButton: document.querySelector('.js-toggle-menu'),
	headerNav: document.querySelector('.js-header-nav'),
	popup: document.querySelector('.js-popup'),
	popupItem: document.querySelector('.js-popup-item'),
	popupLink: document.querySelectorAll('.js-popup-link'),
	popupClose: document.querySelectorAll('.js-popup-close'),
	popupContainer: document.querySelector('.js-popup-container'),
	scrollToLinks: document.querySelectorAll('.js-scroll-to')
}

const toggleMenu = () => {
	const button = domSelectors.toggleMenuButton;
	button.classList.toggle(state.open);

	domSelectors.headerNav.classList.toggle(state.open);
	document.body.classList.toggle('overflow-hidden');

	if(button.classList.contains(state.open)) {
		domSelectors.headerNav.classList.remove(state.closed);
	} else {
		domSelectors.headerNav.classList.add(state.closed);
	}
}

const closeMenu = () => {
	if (domSelectors.headerNav.classList.contains(state.open)) {
		document.body.classList.remove('overflow-hidden');
		domSelectors.headerNav.classList.remove(state.open);
		domSelectors.toggleMenuButton.classList.remove(state.open);
	}
}

const openPopup = (item) => {
	const container = domSelectors.popup;
	container.style.display = 'block';
	container.style.opacity = 1;
	item.style.opacity = 1;
	item.style.display = 'block';
	item.classList.add(state.open);
	item.classList.remove(state.closed);
}

const closePopup = () => {
	const container = domSelectors.popup;
	const item = domSelectors.popupItem;

	item.classList.remove(state.open);
	item.classList.add(state.closed);
	item.style.opacity = 0;

	window.setTimeout(function () {
		container.style.display = 'none';
	}, 260);
}

const populatePopup = (project) => {
	const container = domSelectors.popup;
	const item = domSelectors.popupItem;

	// Get correct data to populate the popup
	const projectData = projects[project];
	container.setAttribute('current-project', project);

	// Image
	item.querySelector('.js-popup-image').setAttribute('src', projectData.img.src);
	item.querySelector('.js-popup-image').setAttribute('alt', projectData.img.alt);

	// Description
	item.querySelector('.js-popup-description').innerHTML = `<p>${projectData.description}</p>`;

	// Links
	projectData.links.forEach((link) => {
		item.querySelector('.js-popup-links').innerHTML = '';
		item.querySelector('.js-popup-links').insertAdjacentHTML('beforeend', `<a href=${link.href}>${link.title}</a>`);
	});
}

const handlePopup = (event) => {
	const container = domSelectors.popup;
	const item = domSelectors.popupItem;

	const currentLink = event.target;
	const project = currentLink.getAttribute('data-project');

	if (container.offsetHeight !== 0 && container.getAttribute('current-project') === project) {
		// Current project is already visible - do nothing
		return;
	}

	if(container.offsetHeight !== 0 && item.offsetHeight !== 0) {
		closePopup();

		window.setTimeout(function () {
			populatePopup(project);
			openPopup(item);
		}, 350);
	} else if (container.offsetHeight === 0) {
		populatePopup(project);
		openPopup(item);
	}
}

const scrollTo = (e) => {
	e.preventDefault();
	const href = e.target.getAttribute("href");
	const target = e.target;

	function scroll() {
		document.querySelector(href).scrollIntoView({ 
			behavior: 'smooth'
		});
	}

	if(window.innerWidth < bp.tablet && !target.closest('.js-footer-nav')) {
		toggleMenu()

		setTimeout(function(){ scroll(); }, 250);
	} else {
		scroll();
	}
}

// Event Listenres
domSelectors.toggleMenuButton.addEventListener('click', toggleMenu);
window.addEventListener('resize', closeMenu);

domSelectors.popupLink.forEach(function(item) {
	item.addEventListener('click', (e) => {
		if(window.innerWidth >= bp.desktop) {
			console.log('desktop');
			return;
		}
		handlePopup(e);
	});
});

domSelectors.popupClose.forEach(function(item) {
	item.addEventListener('click', () => closePopup());
});

domSelectors.popupLink.forEach(function(item) {
	item.addEventListener('mouseover', (e) => {
		if(window.innerWidth < bp.desktop) {
			console.log('mobile/tablet');
			return;
		}
		handlePopup(e);
	});
});

domSelectors.popupContainer.addEventListener('mouseleave', (e) => {
	if(window.innerWidth < bp.desktop) {
		console.log('mobile/tablet');
		return;
	}
	closePopup();
});

domSelectors.scrollToLinks.forEach(function(item) {
	item.addEventListener('click', (e) => { scrollTo(e) });
});
