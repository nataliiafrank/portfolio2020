import { gsap } from 'gsap';
import { bp } from './utilities';

export const popups = document.querySelectorAll('.js-popup');

const linksSelector = (popup) => popup.querySelectorAll('.js-popup-link');
const closeButtonsSelector = (popup) => popup.querySelectorAll('.js-popup-close');
const popupContainer = (popup) => popup.closest('.js-popup-container');

const openPopup = (popup, link) => {
	const id = link.getAttribute('data-project-id');
	const itemSelector = document.querySelector(id);
	const containerDataId = popup.getAttribute('data-open-project-id');

	if(containerDataId === id) {
		return;
	}

	if (containerDataId !== '') {
		closePopup(popup);
	}

	itemSelector.classList.add('is-open');
	popup.setAttribute('data-open-project-id', id)
	
	gsap.to(id, {
		autoAlpha: 1,
	});
}

const closePopup = (popup) => {
	const openId = popup.getAttribute('data-open-project-id');

	if (!openId) {
		// Nothing to close
		return;
	}

	gsap.to(openId, {autoAlpha: 0,});

	document.querySelector(openId).classList.remove('is-open');
	popup.setAttribute('data-open-project-id', '');
}

export const initialize = (popup) => {

	//// Click events for mobile/tablet view

	// Open popup on link click
	linksSelector(popup).forEach((link) => {
		link.addEventListener('click', (e) => { 
			if(window.innerWidth >= bp.desktop) {
				return;
			}
			openPopup(popup, link);
		});
	});

	// Close popup on button click
	closeButtonsSelector(popup).forEach((button) => {
		button.addEventListener('click', (e) => {
			if(window.innerWidth >= bp.desktop) {
				return;
			}

			closePopup(popup);
		});
	});

	//// Mouse events for desktop view

	let enterTimeout = 0;

	linksSelector(popup).forEach((link) => {
		link.addEventListener('mouseover', (e) => {
			if(window.innerWidth < bp.desktop) {
				return;
			}

			enterTimeout = setTimeout(() => {
				openPopup(popup, link);
			}, 150);
		});
	});

	// to clear timer
	linksSelector(popup).forEach((link) => {
		link.addEventListener('mouseleave', (e) => {
			if(window.innerWidth < bp.desktop) {
				return;
			}

			clearTimeout(enterTimeout);
		});
	});

	popupContainer(popup).addEventListener('mouseleave', () => {
		if(window.innerWidth < bp.desktop) {
			return;
		}

		closePopup(popup)
	});
}