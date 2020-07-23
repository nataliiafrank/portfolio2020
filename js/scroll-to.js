import { gsap } from "gsap";
import { bp } from './utilities';
import { toggle as toggleMenu } from './menu';
import { toggleMenuButton } from './menu'

const scrollToLinks = document.querySelectorAll('.js-scroll-to');

const scroll = (href) => {
	gsap.to(window, 0.8, {scrollTo:{y: href}});
}

const scrollTo = (e, link) => {
	e.preventDefault();

	const { target } = e;
	const href = link.getAttribute("href");

	if(window.innerWidth < bp.tablet && !target.closest('.js-footer-nav')) {
		toggleMenu();

		setTimeout(() => scroll(href), 250);
	} else {
		scroll(href);
	}
}

export const initialize = () => {
	// Event handlers
	if(!scrollToLinks) {
		return;
	}

	scrollToLinks.forEach(function(link) {
		link.addEventListener('click', (e) => { scrollTo(e, link) });
	});
}