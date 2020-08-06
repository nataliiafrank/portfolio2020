import { gsap } from "gsap";

const cv = document.querySelector('.js-revele-cv');

const showCV = () => {
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger:'#cv',
			start: '-100px top',
		}
	});

	tl.addLabel('cv-start')
	.from(cv, {
		y: 100,
		opacity: 0,
		duration: 0.6,
	})
	.to(cv, {
		opacity: 1,
		y: 0,
	});
}

export const initialize = () => {
	if(!cv) {
		return;
	}

	showCV();
}