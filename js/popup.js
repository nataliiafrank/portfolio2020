import { gsap } from 'gsap';
import { bp } from './utilities';

const popupSelector = document.querySelector('.js-popup');
const linksSelector = document.querySelectorAll('.js-popup-link');
const closeButtonsSelector = document.querySelectorAll('.js-popup-close');
const popupContainer = document.querySelector('.js-popup-container');

const openPopup = (link) => {
	const id = link.getAttribute('data-project-id');
	const itemSelector = document.querySelector(id);
	const containerDataId = popupSelector.getAttribute('data-open-project-id');

	if(containerDataId === id) {
		return;
	}

	if (containerDataId !== '') {
		closePopup(containerDataId);
	}

	itemSelector.classList.add('is-open');
	popupSelector.setAttribute('data-open-project-id', id)
	
	gsap.to(id, {
		autoAlpha: 1,
		scrollTo:{
			y: id // doesn't work
		}
	});

	// gsap.to( id, {
	// 	opacity: 1,
	// 	duration: 1,
	// 	delay: 0.25,
	// 	visibility: 'visible',
	// 	immediateRender:false,
	// 	ease: 'power3',
	// 	scrollTo:{
	// 		y: id // doesn't work
	// 	}
	// });
}

const closePopup = (popupId) => {
	// Look for id if not provided
	const openId = popupId || popupSelector.getAttribute('data-open-project-id');

	console.log('close popup', openId, popupSelector);

	if (!openId) {
		// Nothing to close
		return;
	}

	gsap.to(openId, {autoAlpha: 0,});

	// gsap.to(openId, {
	// 	opacity: 0,
	// 	duration: 1,
	// 	visibility: 'hidden',
	// 	immediateRender: false,
	// 	ease: 'power3',
	// });

	document.querySelector(openId).classList.remove('is-open');
	popupSelector.setAttribute('data-open-project-id', '');
}

export const initialize = () => {
	// Event handlers
	if(!popupSelector) {
		return;
	}

	//// Click events for mobile/tablet view

	// Open popup on link click
	linksSelector.forEach((link) => {
		link.addEventListener('click', (e) => { 
			if(window.innerWidth >= bp.desktop) {
				return;
			}
			openPopup(link);
		});
	});

	// Close popup on button click
	closeButtonsSelector.forEach((button) => {
		button.addEventListener('click', (e) => {
			if(window.innerWidth >= bp.desktop) {
				return;
			}

			closePopup();
		});
	});

	//// Mouse events for desktop view


	let enterTimeout = 0;

	linksSelector.forEach((link) => {
		link.addEventListener('mouseover', (e) => {
			if(window.innerWidth < bp.desktop) {
				return;
			}

			console.log('enter timeout')
			enterTimeout = setTimeout(() => {
				console.log('execute stuff inside timeout', link);
				openPopup(link);
			}, 150);
		});
	});

	// to clear timer
	linksSelector.forEach((link) => {
		link.addEventListener('mouseleave', (e) => {
			if(window.innerWidth < bp.desktop) {
				return;
			}

			clearTimeout(enterTimeout);
		});
	});

	popupContainer.addEventListener('mouseleave', () => closePopup());
}