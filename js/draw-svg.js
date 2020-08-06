import { gsap } from "gsap";

const svgSelector = document.querySelectorAll('.js-draw');

const draw = () => {
	const svgs = [...svgSelector];

	svgs.forEach((item) => {
		const pathLength = Math.ceil(item.getTotalLength());
		item.style = `stroke-dasharray: ${pathLength}; stroke-dashoffset: ${pathLength};`;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: item.closest('section'),
				start: 'top top',
				toggleActions: 'play pause resume restart',
			},
		});

		tl.addLabel('start')
		.to(item.id, { x: 0 })
		.add(function() { item.classList.add('is-drawn') }, 'start')
	});
}

export const initialize = () => {
	if(!svgSelector) {
		return;
	}

	draw();
}