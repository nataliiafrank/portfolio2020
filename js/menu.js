// Code for home page menu
import { states } from './utilities';

const hiddenClass = 'overflow-hidden';

export const headerNav = document.querySelector('.js-header-nav');
export const toggleMenuButton = document.querySelector('.js-toggle-menu');

export const toggle = () => {
	toggleMenuButton.classList.toggle(states.open);
	headerNav.classList.toggle(states.open);

	document.body.classList.toggle(hiddenClass);

	if(toggleMenuButton.classList.contains(states.open)) {
		headerNav.classList.remove(states.closed);
	} else {
		headerNav.classList.add(states.closed);
	}
};

// utility
const close = () => {
	if (headerNav.classList.contains(states.open)) {
		document.body.classList.remove(hiddenClass);

		headerNav.classList.remove(states.open);
		toggleMenuButton.classList.remove(states.open);
	}
}

export const initialize = () => {
	// Event handlers
	if(!toggleMenuButton) {
		return;
	}

	toggleMenuButton.addEventListener('click', toggle);
	window.addEventListener('resize', close);
}